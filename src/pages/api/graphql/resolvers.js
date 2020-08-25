import { AuthenticationError } from 'apollo-server-micro'
import { argsToArgsConfig } from 'graphql/type/definition'

const resolvers = {
    Query: {
        users: async (_parent, _args, _context, _info) => {
            if (_context.userInfo) {
                if (_context.userInfo.permissions.includes("read: users")) {
                    const result = await _context.db
                        .collection('users')
                        .find(_args)
                        .toArray()
                    console.log(result)
                    return result
                } 
            } 
            throw new AuthenticationError('Unauthorized Access')
        },
        retailers: async (_parent, _args, _context, _info) => {
            const result = await _context.db
                .collection('retailers')
                .find(_args)
                .toArray()
            return result
        },
        productPage: async (_parent, _args, _context, _info) => {
            let mongoSearch = {}
            let limit = 9
            if (_args.limit) {
                limit = _args.limit
            }
            let page = 1
            if (_args.page) {
                page = _args.page
            }

            if (_args.search) {
                let search = _args.search.split(" ")

                let searchName = [] // search by name
                let searchSku = []  // search by sku

                search.forEach((keyword) => {
                    const regex1 = new RegExp(`${keyword}`, 'i');
                    const regex2 = new RegExp(`\\b(${keyword})\\b`, 'i');
                    searchName = [...searchName, { name: regex2 }]
                    searchSku = [...searchSku, { sku: regex1 }]
                })

                let searchList = { $or: [{ $and: searchName }, ...searchSku] }
                mongoSearch = searchList
                console.log(mongoSearch)
            }

            let skip = 0
            if (page > 1) {
                skip = limit * (page - 1)
            }
            console.log("skip:", skip)
            console.log("limit:", limit)

            const result = await _context.db
                .collection('products2')
                .find(mongoSearch).sort({sku: 1}).skip(skip).limit(limit)
                .toArray()

            console.log(result)

            const pageCount = await _context.db
                .collection('products2')
                .find(mongoSearch).count()

            console.log("pageCount: ", pageCount)

            return { products: result, count: pageCount }
        },
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
            
            const regex = new RegExp(`\\b(${_args.collection})\\b`, 'i');
            console.log(regex)
            mongoSearch = {collection: regex}

            const result = await _context.db
                .collection('products2')
                .find(mongoSearch).sort({sku: 1}).skip(skip).limit(limit)
                .toArray()
            const pageCount = await _context.db
                .collection('products2')
                .find(mongoSearch).count()

            return { products: result, count: pageCount }
        },
        product: async (_parent, _args, _context, _info) => {
            const result = await _context.db
                .collection('products')
                .findOne(_args)
            return result
        },
        products: async (_parent, _args, _context, _info) => {
            const result = await _context.db
                .collection('products2')
                .find(_args)
                .toArray()
            return result
        },
        category: async (_parent, _args, _context, _info) => {
            const result = await _context.db
                .collection('categories')
                .findOne(_args)
            return result
        },
        categories: async (_parent, _args, _context, _info) => {
            const result = await _context.db
                .collection('categories')
                .find(_args)
                .toArray()
            return result
        },
    },
}

export default resolvers