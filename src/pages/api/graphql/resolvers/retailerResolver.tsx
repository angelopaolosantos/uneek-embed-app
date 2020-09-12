import { ObjectId } from "mongodb";

export default {
  Query: {
    retailers: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("retailers")
        .find(_args)
        .toArray();
      return result;
    },
  },
};
