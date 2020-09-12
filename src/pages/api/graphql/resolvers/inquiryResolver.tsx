import { ObjectId } from 'mongodb'

export default {
  Query: {
    inquiries: async (_parent, _args, _context, _info) => {
      try {
        const result = await _context.db
          .collection('inquiries')
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
    deleteInquiry: async (_parent, _args, _context, _info) => {
      console.log("deleting: ",_args.id)
      try {
        const response = await _context.db
          .collection('inquiries')
          .deleteOne({ _id: ObjectId(_args.id) })

        console.log(response)

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
        throw new Error(e.message)
      }
    },
  },
}
