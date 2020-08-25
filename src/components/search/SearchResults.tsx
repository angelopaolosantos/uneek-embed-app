import { useQuery, gql } from "@apollo/client";
import _ from "lodash";
import { Placeholder, Pagination } from "rsuite";
import Link from "next/link";
import { useRouter } from "next/router";

const { Paragraph, Graph } = Placeholder;

const SearchResults = (props) => {
  const search = _.trim(props.search);
  if (search != "" && search.length > 3) {
    const QUERY = gql`
      query SearchProducts($search: String, $limit: Int, $page: Int) {
        productPage(search: $search, limit: $limit, page: $page) {
          products {
            sku
            name
            price
            images
          }
          count
        }
      }
    `;
    const { loading, error, data } = useQuery(QUERY, {
      variables: {
        search: search,
        limit: props.limit,
        page: props.currentPage,
      },
    });
    if (loading) {
      return (
        <div className="products-block">
          <div className="placeholder">
            <Graph width={100} active />
            <Paragraph rows={3} active />
          </div>
          <div className="placeholder">
            <Graph width={100} active />
            <Paragraph rows={3} active />
          </div>
          <div className="placeholder">
            <Graph width={100} active />
            <Paragraph rows={3} active />
          </div>

          <style jsx>
            {`
              .products-block {
                display: grid;
                grid-template-columns: auto auto auto;
              }
              .placeholder {
                padding: 15px;
                margin: 5px;
              }
            `}
          </style>
        </div>
      );
    }

    if (error) {
      return <div>"Error Occured"</div>;
    }

    const listProd = data.productPage.products.map((product) => {
      return (
        <div key={product.sku} className="product">
          <div className="product-img">
            <Link href={`/products/${product.sku}`}>
              <a>
                <img src={product.images} className="responsive" />
              </a>
            </Link>
          </div>
          <div className="product-detail">
            <div className="product-name">
              <Link href={`/products/${product.sku}`}>
                <a>{product.name}</a>
              </Link>
            </div>
            <div className="product-sku">{product.sku}</div>
            {product.price > 0 && (
              <div className="product_price">{product.price}</div>
            )}
          </div>
          <style jsx>
            {`
              .product {
                text-align: center;
                padding: 15px;
                margin: 5px;
              }

              .responsive {
                width: 100%;
                height: auto;
              }

              .product-name {
                font-size: 1.2em;
              }
              .product-sku {
                font-size: 0.8em;
              }
              .product-price {
                font-size: 1.2em;
              }
            `}
          </style>
        </div>
      );
    });

    const pages = Math.ceil(data.productPage.count / props.limit);

    const router = useRouter();

    const handleOnSelect = (page) => {
      props.setCurrentPage(page);
      router.push(`/search?keywords=${props.search}&page=${page}`);
    };

    return (
      <div className="container">
        <h3>{data.productPage.count} results found.</h3>
        <div className="products-block">{listProd}</div>
        <div className="pagination">
          {pages > 1 && (
            <Pagination
              prev={true}
              next={true}
              pages={pages}
              maxButtons={5}
              activePage={props.currentPage}
              onSelect={handleOnSelect}
              ellipsis={true}
              boundaryLinks={true}
            />
          )}
        </div>
        <style jsx>
          {`
            .container {
              text-align: center;
              padding-top: 25px;
            }

            .products-block {
              display: grid;
              grid-template-columns: 33% 33% 33%;
            }

            .pagination {
              text-align: center;
            }

            @media only screen and (max-width: 600px) {
              .products-block {
                grid-template-columns: auto auto;
              }
            }
          `}
        </style>
      </div>
    );
  } else {
    // Default content
    return <div></div>;
  }
};

export default SearchResults;
