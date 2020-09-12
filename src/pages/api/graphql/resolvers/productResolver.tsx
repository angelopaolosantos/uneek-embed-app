import { ObjectId } from "mongodb";

export default {
  Query: {
    productPage: async (_parent, _args, _context, _info) => {
      let mongoSearch = {};
      let limit = 9;
      if (_args.limit) {
        limit = _args.limit;
      }
      let page = 1;
      if (_args.page) {
        page = _args.page;
      }

      if (_args.search) {
        let search = _args.search.split(" ");

        let searchName = []; // search by name
        let searchSku = []; // search by sku

        search.forEach((keyword) => {
          const regex1 = new RegExp(`${keyword}`, "i");
          const regex2 = new RegExp(`\\b(${keyword})\\b`, "i");
          searchName = [...searchName, { name: regex2 }];
          searchSku = [...searchSku, { sku: regex1 }];
        });

        let searchList = { $or: [{ $and: searchName }, ...searchSku] };
        mongoSearch = searchList;
        console.log(mongoSearch);
      }

      let skip = 0;
      if (page > 1) {
        skip = limit * (page - 1);
      }
      console.log("skip:", skip);
      console.log("limit:", limit);

      const result = await _context.db
        .collection("products2") // Change to 3
        .find(mongoSearch)
        .sort({ sku: 1 })
        .skip(skip)
        .limit(limit)
        .toArray();

      console.log(result);

      const pageCount = await _context.db
        .collection("products2") // Change to 3
        .find(mongoSearch)
        .count();

      console.log("pageCount: ", pageCount);

      return { products: result, count: pageCount };
    },
    productCategoryPage: async (_parent, _args, _context, _info) => {
      let mongoSearch = {};
      let limit = 9;
      if (_args.limit) {
        limit = _args.limit;
      }
      let page = 1;
      if (_args.page) {
        page = _args.page;
      }
      let skip = 0;
      if (page > 1) {
        skip = limit * (page - 1);
      }

      const regex = new RegExp(`\\b(${_args.collection})\\b`, "i");
      console.log(regex);
      mongoSearch = { collection: regex };

      const result = await _context.db
        .collection("products2") // Change to 3
        .find(mongoSearch)
        .sort({ sku: 1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      const pageCount = await _context.db
        .collection("products2") // Change to 3
        .find(mongoSearch)
        .count();

      return { products: result, count: pageCount };
    },
    product: async (_parent, _args, _context, _info) => {
      const result = await _context.db.collection("products3").findOne(_args);
      return result;
    },
    products: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("products3")
        .find(_args)
        .toArray();
      return result;
    },
    productById: async (_parent, _args, _context, _info) => {
      console.log(_args);
      const result = await _context.db
        .collection("products3")
        .findOne({ _id: ObjectId(_args.id) });
      return result;
    },
  },
  Mutation: {
    updateProduct: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db.collection("products3").updateOne(
          { _id: ObjectId(_args.id) },
          {
            $set: _args.input,
          }
        );

        console.log(_args.id);
        console.log(response);

        if (response.modifiedCount > 0) {
          return {
            success: true,
            message: "Item updated!",
          };
        }

        return {
          success: false,
          message: "Item was not updated.",
        };
      } catch (e) {
        return {
          success: false,
          message: "Error occured, Item not updated.",
        };
      }
    },
    createProduct: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db
          .collection("products3")
          .insertOne(_args.input);

        console.log(response.insertedId);

        if (response.insertedId) {
          return {
            success: true,
            message: `Item created! _id: ${response.insertedId}`,
          };
        }

        return {
          success: false,
          message: "Item was not created.",
        };
      } catch (e) {
        return {
          success: false,
          message: "Error occured, Item was not created.",
        };
      }
    },
    deleteProduct: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db
          .collection("products3")
          .deleteOne({ _id: ObjectId(_args.id) });

        console.log(response);

        if (response.deletedCount > 0) {
          return {
            success: true,
            message: `Item deleted!`,
          };
        }

        return {
          success: false,
          message: "Item was not deleted.",
        };
      } catch (e) {
        console.log(e);
        return {
          success: false,
          message: "Error occured, Item was not deleted.",
        };
      }
    },
  },
};
