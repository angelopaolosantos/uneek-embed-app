import { ObjectId } from "mongodb";

export default {
  Query: {
    users: async (_parent, _args, _context, _info) => {
      // if (_context.userInfo) {
      if (_context.userInfo.permissions.includes("read: users")) {
        const result = await _context.db
          .collection("users")
          .find(_args)
          .toArray();
        console.log(result);
        return result;
      }
      //}
      //throw new AuthenticationError('Unauthorized Access')
    },
  },
};
