import _ from "lodash";
import { Placeholder, Pagination } from "rsuite";
import Link from "next/link";
import { useRouter } from "next/router";

const { Paragraph, Graph } = Placeholder;

const Products = (props) => {

  console.log(props)

  return ("test")

  /*
  if (props.result && props.result.count > 0) {
    return (<div>No Result</div>)
  }
  const pages = Math.ceil(props.result.count / 9);
  const router = useRouter();

  const handleOnSelect = (page) => {
    props.setCurrentPage(page);
    router.push(`/categories/${props.route}?page=${page}`);
  };

  const listProd = props.result.products.map((product) => {
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

  return (
    <div>
      <div className="container">
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
              max-width: 992px;
              margin: 1rem auto;
            }

            .products-block {
              display: grid;
              grid-template-columns: auto auto auto;
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
    </div>
  );
  */
};

export default Products;
