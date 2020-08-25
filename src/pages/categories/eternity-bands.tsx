import Head from "next/head";
import Template from "../../components/templates/default";
import Category from "../../components/categories";
import { fetchAPI } from "../../contexts/apollo/fetchAPI";
import { useState } from "react";

const Page = ({ result }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Template>
      <Head>
        <title>Uneek Jewelry - Uneek Eternity Bands</title>
      </Head>
      <main>
        <div className="category-detail">
        <h1>Eternity Bands</h1>
        </div>
        <Category
          route="eternity-bands"
          result={result.productCategoryPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
      <style jsx>
        {`
        .category-detail {
          max-width: 992px;
          text-align: center;
          margin: 1rem auto;
        }
        `}
      </style>
    </Template>
  );
};

export default Page;

export async function getServerSideProps({ params, query }) {
  const QUERY = `
        query GetProduct($collection: String!, $page: Int) {
            productCategoryPage(collection: $collection, limit: 9, page: $page) {
                products {
                  sku
                  images
                  name
                  price
                  metal
                }
                count
              }
      }`;

  let page = 1;

  if (query.page) {
    page = parseInt(query.page);
  }
  const result = await fetchAPI(QUERY, {
    variables: { collection: "Eternity Bands", page: page },
  });

  return {
    props: {
      result,
    }, // will be passed to the page component as props
  };
}
