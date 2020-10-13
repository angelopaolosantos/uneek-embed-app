import { fetchAPI } from '../../../../contexts/apollo/fetchAPI'
import { gql, useMutation } from '@apollo/client'
import { Form, Input, Button, Divider, Select, message, Table } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from 'react-beautiful-dnd'
import Template from '../../../../components/admin/templates/default'
import auth0, { redirect } from '../../../../utils/auth0'

resetServerContext()

const Page = ({ result, session }) => {
  //console.log(result)
  const router = useRouter()

  const [products, setProducts] = useState(result.category.products)

  useEffect(() => {
    if (result.error == true) {
      message.error('Error occured')
      router.push('/admin/catalog/categories')
    }
  }, [])

  const UPDATE_CATEGORY_PRODUCTS = gql`
    mutation UpdateCategoryProducts($category: String!) {
      updateCategoryProducts(category: $category) {
        success
        message
      }
    }
  `

  const [updateCategoryProducts] = useMutation(UPDATE_CATEGORY_PRODUCTS)

  const handleCheckInventory = async () => {
    try {
      const response = await updateCategoryProducts({
        variables: { category: result.category.category },
      })

      if (response.data.updateCategoryProducts.success) {
        message.success(response.data.updateCategoryProducts.message)
      } else {
        message.error(response.data.updateCategoryProducts.message)
      }
    } catch (e) {
      console.log(e.message)
      message.error(`Error occured: "${e.message}"`)
    }
  }

  const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($id: ID!, $input: CategoryInput) {
      updateCategory(id: $id, input: $input) {
        success
        message
      }
    }
  `
  const [updateCategory] = useMutation(UPDATE_CATEGORY)

  const handleSaveSortOrder = async () => {
    console.log(result.category._id)
    console.log('products:', products)
    const filteredProducts = products.map((product) => {
      return {
        sku: product.sku,
        name: product.name,
        price: product.price,
        images: product.images,
      }
    })

    console.log('Filtered Products:', filteredProducts[0])

    try {
      const response = await updateCategory({
        variables: { id: result.category._id, input: { products } },
      })

      if (response.data.updateCategory.success) {
        message.success(response.data.updateCategory.message)
      } else {
        message.error(response.data.updateCategory.message)
      }
    } catch (e) {
      console.log(e.message)
      message.error(`Error occured: "${e.message}"`)
    }
  }

  const handleOnDragEnd = (result) => {
    console.log('drag result:', result)

    const items = Array.from(products)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setProducts(items)
    console.log(products)
  }

  return (
    <Template session={session}>
      <div className="container">
        <Link href="/admin/catalog/categories">
          <a>Go back to Categories</a>
        </Link>
        <h1>Manage Category Products</h1>
        <Divider />
        <div>
          <h3>Name: {result.category.name}</h3>
          <h3>Parent: {result.category.parent}</h3>
          <h3>Category: {result.category.category}</h3>
          <Button onClick={handleCheckInventory}>Check Inventory</Button>

          <Button onClick={handleSaveSortOrder}>Save Sort Order</Button>
          {products && (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {products.map(({ _id, sku, name, images }, index) => {
                      let productImage = ''
                      if (images[0]) {
                        productImage = images[0]
                      }
                      return (
                        <Draggable key={sku} draggableId={sku} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <img src={productImage} width={150} /> {sku} -{' '}
                              {name}
                            </li>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </Template>
  )
}

export default Page

export async function getServerSideProps({ query, req, res }) {
  const session = await auth0.getSession(req)
  // check if user is logged in
  if (!session && res) {
    redirect(res, '/admin')
    return {}
  }

  const { id } = query

  console.log(id)

  const QUERY = `
    query GetCategory($id: ID!) {
      category(id: $id) {
        _id
        name
        parent
        category
        products {
            _id
            thumbnail
            sku
            name
            description
            product_type
            category
            gender
            price
            status
            metal
            center_size
            center_shape
            side_stone_weight
            side_stone_pieces
            primary_image
            images
            msrp_14k
            msrp_18k
            msrp_plat
            msrp
            gemstone
            center_stone
            url
            meta_keyword
            meta_description
            meta_title
        }
      }
    }
  `

  const result = await fetchAPI(QUERY, { variables: { id } })

  return {
    props: {
      result,
      session,
    }, // will be passed to the page component as props
  }
}
