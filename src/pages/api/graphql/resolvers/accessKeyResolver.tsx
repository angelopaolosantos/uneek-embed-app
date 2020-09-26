// import { AuthenticationError } from 'apollo-server-micro'\
import { ObjectId } from 'mongodb'

export default {
  Query: {
    accessKeys: async (_parent, _args, _context, _info) => {
      // if (_context.userInfo) {
      let filter = {}

      if (_args.filter) {
        // check if filter argument exist
        const { retailer, type, status } = _args.filter

        if (retailer) {
          const retailerRE = new RegExp(`\\b(${retailer})\\b`, 'i')
          filter = { ...filter, retailer: retailerRE }
        }

        if (type) {
          filter = { ...filter, type }
        }

        if (status) {
          filter = { ...filter, status }
        }
      }
      try {
        const result = await _context.db
          .collection('access_keys')
          .find(filter)
          .toArray()
        return result
      } catch (e) {
        console.log(e.message)
        throw new Error(e.message)
      }
      //}
      //throw new AuthenticationError('Unauthorized Access')
    },
    accessKey: async (_parent, _args, _context, _info) => {
      try {
        const result = await _context.db
          .collection('access_keys')
          .findOne({ _id: ObjectId(_args.id) })
        return result
      } catch (e) {
        console.log(e.message)
        throw new Error(e.message)
      }
    },
    verifyAccessKey: async (_parent, _args, _context, _info) => {
      try {
        const result = await _context.db
          .collection('access_keys')
          .findOne({ key: _args.key, status: "enabled", type: "embed" })
        return result
      } catch (e) {
        console.log(e.message)
        throw new Error(e.message)
      }
    }
  },
  Mutation: {
    updateAccessKey: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db.collection('access_keys').updateOne(
          { _id: ObjectId(_args.id) },
          {
            $set: {
              ..._args.input
            },
          }
        )

        console.log(response)

        if (response.matchedCount > 0) {
          if (response.modifiedCount > 0) {
            return {
              success: true,
              message: 'Item updated!',
            }
          }
          return {
            success: true,
            message: 'Item found. No change made.',
          }
        }

        return {
          success: false,
          message: 'Item was not updated.',
        }
      } catch (e) {
        return {
          success: false,
          message: 'Error occured, Item not updated.',
        }
      }
    },
    createAccessKey: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db.collection('access_keys').insertOne({
          ..._args.input
        })

        console.log(response.insertedId)

        if (response.insertedId) {
          return {
            success: true,
            message: `Item created! _id: ${response.insertedId}`,
          }
        }

        return {
          success: false,
          message: 'Item was not created.',
        }
      } catch (e) {
        return {
          success: false,
          message: 'Error occured, Item was not created.',
        }
      }
    },
    deleteAccessKey: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db
          .collection('access_keys')
          .deleteOne({ _id: ObjectId(_args.id) })

        if (response.deletedCount > 0) {
          return {
            success: true,
            message: `Item deleted!`,
          }
        }

        return {
          success: false,
          message: 'Item was not deleted.',
        }
      } catch (e) {
        console.log(e.message)
        // throw new Error(e.message)
        return {
          success: false,
          message: 'Error occured, Item was not deleted.',
        }
      }
    },
  },
}
