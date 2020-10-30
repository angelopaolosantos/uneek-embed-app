import { ObjectId } from 'mongodb'

export default {
  Query: {
    category: async (_parent, _args, _context, _info) => {
      try {
        const result = await _context.db
          .collection('categories2')
          .findOne({ _id: ObjectId(_args.id) })
        return result
      } catch (e) {
        console.log(e.message)
        throw new Error(e.message)
      }
    },
    categories: async (_parent, _args, _context, _info) => {
      try {
        const result = await _context.db
          .collection('categories2')
          .find(_args.filter)
          .sort({ category: 1 })
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
        const response = await _context.db.collection('categories2').updateOne(
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
          message: `Error occured, Item not updated.${e.message}`,
        }
      }
    },
    createCategory: async (_parent, _args, _context, _info) => {
      try {
        const response = await _context.db.collection('categories2').insertOne({
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
          .collection('categories2')
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
    updateCategoryProducts: async (_parent, _args, _context, _info) => {
      let category = _args.category
      let sort = _args.sort

      console.log('sort:', sort)

      try {
        // Get products
        

        if (sort == 'sku') {
          const productsData = await _context.db
          .collection('products')
          .find({ category: { $all: [category] }, status: 'active' })
          .sort({ sku: 1 })
          .toArray()

          const response = await _context.db
            .collection('categories2')
            .updateOne(
              { category },
              {
                $set: {
                  products: productsData,
                },
              }
            )

            return {
              success: true,
              message: 'Category products updated, sorted by SKU',
            }
            
        } else if (sort == 'product_type') {
          const productsData = await _context.db
          .collection('products')
          .find({ category: { $all: [category] }, status: 'active' })
          .sort({ product_type: 1 })
          .toArray()

          console.log(productsData)

          const response = await _context.db
            .collection('categories2')
            .updateOne(
              { category },
              {
                $set: {
                  products: productsData,
                },
              }
            )

            return {
              success: true,
              message: 'Category products updated, sorted by Type',
            }

        } else {
          const productsData = await _context.db
          .collection('products')
          .find({ category: { $all: [category] }, status: 'active' })
          .toArray()

          // Get Category products
          const categoryData = await _context.db
            .collection('categories2')
            .findOne({ category })

          // update data

          if (Array.isArray(categoryData.products)) {
            console.log('checking...')
            let currentProducts = categoryData.products
            let newProducts = []

            productsData.forEach((product) => {
              const productIndex = currentProducts.findIndex(
                (object) => object.sku == product.sku
              )

              if (productIndex == -1) {
                // add product to newProducts Array
                newProducts = [...newProducts, product]
              } else {
                console.log(product.sku, ': Found ', productIndex)
                currentProducts[productIndex] = product // update existing product details
              }
            })

            /** Check currentProducts, remove items not found in productsData  */
            const newCurrentProducts = currentProducts.filter((product) => {
              const productIndex = productsData.findIndex(
                (object) => object.sku == product.sku
              )

              if (productIndex == -1) {
                // Item not found, remove from list
                return false
              }
              return true
            })

            const newCategoryProducts = [...newCurrentProducts, ...newProducts]

            //console.log("NewCatProd:", newCategoryProducts)

            const response = await _context.db
              .collection('categories2')
              .updateOne(
                { category },
                {
                  $set: {
                    products: newCategoryProducts,
                  },
                }
              )
          } else {
            const response = await _context.db
              .collection('categories2')
              .updateOne(
                { category },
                {
                  $set: {
                    products: productsData,
                  },
                }
              )
          }

          return {
            success: true,
            message: 'Category products updated',
          }
        }
      } catch (e) {
        console.log(e.message)
        // throw new Error(e.message)
        return {
          success: false,
          message: 'Error occured, category products not updated',
        }
      }
    },
    /*
    updateCategory2: async (_parent, _args, _context, _info) => {
      console.log(_args.input)

      return {
        success: false,
        message: 'Item was not updated.',
      }
      /*
      try {
        const response = await _context.db.collection('categories2').updateOne(
          { _id: ObjectId(_args.id) },
          {
            $set: {
              products: _args.input,
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
          message: `Error occured, Item not updated.${e.message}`,
        }
      }
    },*/
  },
}
