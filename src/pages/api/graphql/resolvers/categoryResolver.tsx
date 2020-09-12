import { ObjectId } from 'mongodb'

export default {
  Query: {
    category: async (_parent, _args, _context, _info) => {

      try {
        const result = await _context.db.collection('categories').findOne({ _id: ObjectId(_args.id) })
        return result
      } catch (e) {
        console.log(e.message)
        throw new Error(e.message)
      }
    },
    categories: async (_parent, _args, _context, _info) => {
      try {
        const result = await _context.db
          .collection('categories')
          .find(_args)
          .toArray()
        return result
      } catch (e) {
        console.log(e.message)
        throw new Error(e.message)
      }
    },
  },
  Mutation: {
    updateCategory: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db.collection('categories').updateOne(
          { _id: ObjectId(_args.id) },
          {
            $set: {
              ..._args.input,
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
    createCategory: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db.collection('categories').insertOne({
          ..._args.input,
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
    deleteCategory: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db
          .collection('categories')
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
