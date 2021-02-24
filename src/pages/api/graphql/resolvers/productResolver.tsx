import { ObjectId } from 'mongodb'
import { AuthenticationError } from 'apollo-server-micro'

export default {
  Query: {
    /**  
     * Front end product search
     * http://localhost:3000/search*/
    productPage: async (_parent, _args, _context, _info) => {
      let mongoSearch = {}
      let limit = 18
      let sort = null
      let page = 1
      
      if (_args.sort) {
        sort = _args.sort
      }
      if (_args.limit) {
        limit = _args.limit
      }
      if (_args.page) {
        page = _args.page
      }

      let sortCondition
      switch (sort) {
        case 1: {
          sortCondition = { price: 1 }
          break
        }
        case 2: {
          sortCondition = { price: -1 }
          break
        }
        default: {
          sortCondition = { sku: -1 }
        }
      }

      if (_args.search) {
        let search = _args.search.split(' ')

        let searchName = [] // search by name
        let searchSku = [] // search by sku
        let searchMetaKeywords = [] // search by meta keywords

        search.forEach((keyword) => {
          const regex1 = new RegExp(`${keyword}`, 'i')
          const regex2 = new RegExp(`\\b(${keyword})\\b`, 'i')
          // const regex3 = new RegExp(`\\b,*(${keyword}),*\\b`, 'i')
          searchName = [...searchName, { name: regex2 }]
          searchSku = [...searchSku, { sku: regex1 }]
          // searchMetaKeywords = [...searchMetaKeywords, { meta_keyword: regex3 }]
        })

        let searchList = {
          $or: [
            { $and: searchName },
            // { $and: searchMetaKeywords },
            ...searchSku,
          ],
          status: 'active',
        }
        mongoSearch = searchList
        console.log(mongoSearch)
      }

      let skip = 0
      if (page > 1) {
        skip = limit * (page - 1)
      }
      console.log('skip:', skip)
      console.log('limit:', limit)

      const result = await _context.db
        .collection('products')
        .find(mongoSearch)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .toArray()

      console.log(result)

      const pageCount = await _context.db
        .collection('products')
        .find(mongoSearch)
        .count()

      console.log('pageCount: ', pageCount)

      return { products: result, count: pageCount }
    },
    /*
    productCategoryPage: async (_parent, _args, _context, _info) => {
      let mongoSearch = {}
      let limit = 9
      if (_args.limit) {
        limit = _args.limit
      }
      let page = 1
      if (_args.page) {
        page = _args.page
      }
      let skip = 0
      if (page > 1) {
        skip = limit * (page - 1)
      }

      const regex = new RegExp(`\\b(${_args.collection})\\b`, 'i')
      console.log(regex)
      mongoSearch = { collection: regex }

      const result = await _context.db
        .collection('products2') // Change to 3
        .find(mongoSearch)
        .sort({ sku: 1 })
        .skip(skip)
        .limit(limit)
        .toArray()
      const pageCount = await _context.db
        .collection('products2') // Change to 3
        .find(mongoSearch)
        .count()

      return { products: result, count: pageCount }
    },
    */

    /*product: async (_parent, _args, _context, _info) => {
      const result = await _context.db.collection('products').findOne(_args)
      return result
    },*/

    product: async (_parent, _args, _context, _info) => {
      try {
      
      const { search, by } = _args

      let filter

      switch(by) {
        case "id": {
          filter = { _id: ObjectId(search) }
          break
        }
        case "sku": {
          filter = { sku: search }
          break
        }
        default: {
          filter = { sku: search }
          break
        }
      }

      const result = await _context.db
        .collection('products')
        .findOne(filter)
      return result
      } catch (e) {
        console.log(e.message)
        throw new Error(e.message)
      }
    },
    
    /** /categories/[...categories] */
    /*
    products: async (_parent, _args, _context, _info) => {
      /*if(_context.auth?.permissions.includes("read:products")){
      console.log(_context.auth.permissions)
      } else {
        throw new AuthenticationError('Unauthorized Access')
      }
      let filter = _args.filter

      if (filter && 'category' in filter) {
        filter.category = { $all: filter.category }
      }

      const result = await _context.db
        .collection('products')
        .find(filter)
        .toArray()
      return result
    },*/


    /**
     *  Admin */
    productsSearch: async (_parent, _args, _context, _info) => {
      let search = {}
      if (_args.search) {
        const regex1 = new RegExp(`${_args.search}`, 'i')
        search = { ...search, sku: regex1 }
      }

      console.log(search)

      const result = await _context.db
        .collection('products')
        .find(search)
        .toArray()
      return result
    },
    /** Admin */
    /*
    productById: async (_parent, _args, _context, _info) => {
      console.log(_args)
      const result = await _context.db
        .collection('products')
        .findOne({ _id: ObjectId(_args.id) })
      return result
    },*/
  

  /**
   * Updated Product Queries
   */

  // look for pages using this

  products: async (_parent, _args, _context, _info) => {
    /*if(_context.auth?.permissions.includes("read:products")){
    console.log(_context.auth.permissions)
    } else {
      throw new AuthenticationError('Unauthorized Access')
    }*/
    let { filter, page, limit, sort, sortDirection } = _args
    page = page === undefined ? 1 : page
    limit = limit === undefined ? 0 : limit
    let skip = (page - 1) * limit

    if (filter && 'category' in filter) {
      // reformat filter category query
      filter.category = { $all: filter.category }
    }

    let match_rules = []

    if (filter && 'options' in filter) {
      // reformat filter option query
      for (let option of filter.options) {
        match_rules = [...match_rules, { $elemMatch: option }]
      }

      filter.options = { $all: match_rules }
    }

    match_rules = []

    if (filter && 'details' in filter) {
      // reformat filter details query
      for (let detail of filter.details) {
        match_rules = [...match_rules, { $elemMatch: detail }]
      }

      filter.options = { $all: match_rules }
    }

    // handle sorting
    switch (sortDirection) {
      case "asc": {
        sortDirection = 1;
        break
      }
      case "desc": {
        sortDirection = -1;
        break
      }
      default: {
        sortDirection = 1;
      }
    }

    switch (sort) {
      case 'sku': {
       sort = { sku: sortDirection }
        break
      }
      case 'price': {
       sort = { price: sortDirection }
        break
      }
      default: {
       sort = undefined
      }
    }

    try {
    const result = await _context.db
      .collection('products')
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .toArray()
    
    return result
    } catch(e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  },

},

  Mutation: {
    updateProduct: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db.collection('products').updateOne(
          { _id: ObjectId(_args.id) },
          {
            $set: _args.input,
          }
        )

        console.log(_args.id)
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
    createProduct: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db
          .collection('products')
          .insertOne(_args.input)

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
    deleteProduct: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db
          .collection('products')
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
        console.log(e)
        return {
          success: false,
          message: 'Error occured, Item was not deleted.',
        }
      }
    },
    addProductImage: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db.collection('products').updateOne(
          { _id: ObjectId(_args.id) },
          {
            $push: { images: _args.url },
          }
        )

        console.log(_args.id)
        console.log(response)

        if (response.matchedCount > 0) {
          if (response.modifiedCount > 0) {
            return {
              success: true,
              message: 'Images updated!',
            }
          }
          return {
            success: true,
            message: 'Item found. No change made.',
          }
        }

        return {
          success: false,
          message: 'Images was not updated.',
        }
      } catch (e) {
        console.log(e)
        return {
          success: false,
          message: 'Error occured, Images was not updated.',
        }
      }
    },
    upsertProduct: async (_parent, _args, _context, _info) => {

      let input = _args.input
      if (input.category) {
        input.category = JSON.parse(input.category)
      }

      if (input.images) {
        input.images = JSON.parse(input.images)
      }

      if (input.tags) {
        input.tags = JSON.parse(input.tags)
      }

      if (input.options) {
        input.options = JSON.parse(input.options)
      }

      if (input.details) {
        input.details = JSON.parse(input.details)
      }

      try {
        const response = await _context.db
          .collection('products')
          .updateOne(
            { sku: _args.input.sku },
            { $set: input },
            { upsert: true }
          )

        console.log(response)

        if(response.upsertedCount > 0) {
          return {
            success: true,
            message: 'New item added',
          }
        }

        if(response.modifiedCount > 0) {
          return {
            success: true,
            message: 'Existing item modified',
          }
        }

        return {
          success: false,
          message: 'No change, item was not added/modified',
        }
      } catch (e) {
        return {
          success: false,
          message: 'Error occured, item was not created.',
        }
      }
    },
  },
}
