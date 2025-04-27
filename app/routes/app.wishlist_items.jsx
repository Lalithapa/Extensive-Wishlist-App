import { json } from '@remix-run/node';
import { LegacyCard, EmptyState, Page, DataTable, Thumbnail, Grid } from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import db from "../db.server";
import { useLoaderData } from '@remix-run/react';
import { authenticate } from '../shopify.server';
import TopWishlistProducts from './product_list';

// export async function loader({ request }) {
//   const admin = await authenticate.admin(request);
//   const shop = admin.session.shop;

//   if (!shop) {
//     throw new Response("Shop parameter is missing", { status: 400 });
//   }

//   let wishlist = await db.wishlist.findMany({
//     where: {
//       shop: shop,
//     },
//     orderBy: {
//       createdAt: 'asc',
//     },
//   });

//   // Collect all Product IDs
//   const productGIDs = wishlist.map((item) => `gid://shopify/Product/${item.productId}`);

//   // If no products, return early
//   if (productGIDs.length === 0) {
//     return json([]);
//   }

//   // GraphQL query to get product details
//   const GET_PRODUCTS_QUERY = `
//     query GetProductsByIDs($ids: [ID!]!) {
//       nodes(ids: $ids) {
//         ... on Product {
//           id
//           title
//           handle
//           onlineStoreUrl
//           featuredImage {
//             url
//             altText
//           }
//           createdAt
//         }
//       }
//     }
//   `;

//   const { data } = await admin.graphql(GET_PRODUCTS_QUERY, {
//     variables: { ids: productGIDs },
//   });

//   return json(data.nodes);
// }
export async function loader({ request }) {
  const admin = await authenticate.admin(request);
  const shop = admin.session.shop;
  const accessToken = admin.session.accessToken;

  if (!shop) {
    throw new Response("Shop parameter is missing", { status: 400 });
  }

  let wishlist = await db.wishlist.findMany({
    where: { shop: shop },
    orderBy: { createdAt: 'asc' },
  });

  // Step 1: Sort wishlist by productId + latest createdAt
  wishlist.sort((a, b) => {
    if (a.productId === b.productId) {
      return new Date(b.createdAt) - new Date(a.createdAt); // newer first
    }
    return 0;
  });

  // Step 2: Deduplicate by productId
  const uniqueWishlist = wishlist.filter((item, index, self) =>
    index === self.findIndex((t) => t.productId === item.productId)
  );

  // Step 3: Map to GIDs
  const productGIDs = uniqueWishlist.map((item) => `gid://shopify/Product/${item.productId}`);

  if (productGIDs.length === 0) {
    return json([]);
  }

  const GET_PRODUCTS_QUERY = `
    query GetProductsByIDs($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          id
          title
          handle
          onlineStoreUrl
          featuredImage {
            url
            altText
          }
          createdAt
        }
      }
    }
  `;

  // 🛠️ POST to Shopify Admin GraphQL API
  const response = await fetch(`https://${shop}/admin/api/2024-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({
      query: GET_PRODUCTS_QUERY,
      variables: { ids: productGIDs },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${await response.text()}`);
  }

  const result = await response.json();

  return json(result.data.nodes);
}

export default function Wishlist_Lists() {
  const products = useLoaderData();
  const [allWishlist, setAllWishlist] = useState([]);
  console.log(products, "products Shop");
  useEffect(() => {
    const dataRow = products.map((product, index) => [
      <Thumbnail key={index}
        source={product.featuredImage?.url || ''}
        alt={product.featuredImage?.altText || 'Product Image'}
        size="medium"
      />,
      product.title,
      <a key={index} href={product.handle} rel='noopener noreferrer' target="_blank"> {product.title} </a>
      ,
      0,
    ]);
    setAllWishlist(dataRow);
  }, [products]);

  return (
    <Page title="Wishlists">
      <LegacyCard sectioned>
        {allWishlist.length > 0 ? (
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text',
              'text',
            ]}
            headings={[
              'Image',
              'Title',
              'Shop link',
              'Wishlist Count',
            ]}
            rows={allWishlist}
          />
        ) : (
          <EmptyState
            heading="Add Products to Wishlist"
            action={{ content: 'Add Product' }}
            secondaryAction={{
              content: 'Learn more',
              url: 'https://help.shopify.com',
            }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>Check all wishlist designs.</p>
          </EmptyState>
        )}
      </LegacyCard>
      <TopWishlistProducts allWishlist={allWishlist} />
      <LegacyCard sectioned>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <LegacyCard title="Help center documentation" sectioned>
            <p>Start with our guides and tutorials..</p>
          </LegacyCard>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <LegacyCard title="Contact support" sectioned>
            <p>Got a question or need help? I'm here!</p>
          </LegacyCard>
        </Grid.Cell>
      </Grid>
      </LegacyCard>
    </Page>
  );
}
