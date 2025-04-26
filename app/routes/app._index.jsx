import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";

import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Badge,
  Divider,
  InlineStack,
  ProgressBar,
} from "@shopify/polaris";
//import { Card, Page, Layout, Text, Badge, BlockStack, Button, Divider, InlineStack } from '@shopify/polaris';
import {  TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { json } from '@remix-run/node';

// export const loader = async ({ request }) => {
//   const { billing } = await authenticate.admin(request);
//   await billing.require({
//     plans: [MONTHLY_PLAN],
//     isTest: true,
//     onFailure: async () => billing.request({ plan: MONTHLY_PLAN }),
//   });
//   return null;
// };
export const loader = async ({ request }) => {
  const admin = await authenticate.admin(request);
  const shop = admin.session.shop;
   if (!shop) {
     throw new Response("Shop parameter is missing", { status: 400 });
   }
   let wishlist = await db.wishlist.findMany({
     where: {
       shop: shop // Condition
     },orderBy: {
       createdAt: 'asc'
     }
   }
   );
   return json (wishlist);
 }
 

// export const action = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);
//   const color = ["Red", "Orange", "Yellow", "Green"][
//     Math.floor(Math.random() * 4)
//   ];
//   const response = await admin.graphql(
//     `#graphql
//       mutation populateProduct($product: ProductCreateInput!) {
//         productCreate(product: $product) {
//           product {
//             id
//             title
//             handle
//             status
//             variants(first: 10) {
//               edges {
//                 node {
//                   id
//                   price
//                   barcode
//                   createdAt
//                 }
//               }
//             }
//           }
//         }
//       }`,
//     {
//       variables: {
//         product: {
//           title: `${color} Snowboard`,
//         },
//       },
//     },
//   );
//   const responseJson = await response.json();
//   const product = responseJson.data.productCreate.product;
//   const variantId = product.variants.edges[0].node.id;
//   const variantResponse = await admin.graphql(
//     `#graphql
//     mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
//       productVariantsBulkUpdate(productId: $productId, variants: $variants) {
//         productVariants {
//           id
//           price
//           barcode
//           createdAt
//         }
//       }
//     }`,
//     {
//       variables: {
//         productId: product.id,
//         variants: [{ id: variantId, price: "100.00" }],
//       },
//     },
//   );
//   const variantResponseJson = await variantResponse.json();

//   return {
//     product: responseJson.data.productCreate.product,
//     variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
//   };
// };

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";
  const productId = fetcher.data?.product?.id.replace(
    "gid://shopify/Product/",
    "",
  );

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId, shopify]);
  //const generateProduct = () => fetcher.submit({}, { method: "POST" });
  const wishlist = useLoaderData();
  const [wishlistItem, setwishlistItem] = useState(wishlist);

const uniqueCustomers = new Set(wishlistItem.map(item => item.customerId));
const uniqueProducts = new Set(wishlistItem.map(item => item.productId));
console.log(uniqueCustomers, "uniqueCustomers");
  return (
    // <Page>
    //   <TitleBar title="Remix app template">
    //     <button variant="primary" onClick={generateProduct}>
    //       Generate a product here:
    //     </button>
    //   </TitleBar>
    //   <BlockStack gap="500">
    //     <Layout>
    //       <Layout.Section>
    //         <Card>
    //           <BlockStack gap="500">
    //             <BlockStack gap="200">
    //               <Text as="h2" variant="headingMd">
    //                 Congrats on creating a new Shopify app 🎉
    //               </Text>
    //               <Text variant="bodyMd" as="p">
    //                 This embedded app template uses{" "}
    //                 <Link
    //                   url="https://shopify.dev/docs/apps/tools/app-bridge"
    //                   target="_blank"
    //                   removeUnderline
    //                 >
    //                   App Bridge
    //                 </Link>{" "}
    //                 interface examples like an{" "}
    //                 <Link url="/app/additional" removeUnderline>
    //                   additional page in the app nav
    //                 </Link>
    //                 , as well as an{" "}
    //                 <Link
    //                   url="https://shopify.dev/docs/api/admin-graphql"
    //                   target="_blank"
    //                   removeUnderline
    //                 >
    //                   Admin GraphQL
    //                 </Link>{" "}
    //                 mutation demo, to provide a starting point for app
    //                 development.
    //               </Text>
    //             </BlockStack>
    //             <BlockStack gap="200">
    //               <Text as="h3" variant="headingMd">
    //                 Get started with products
    //               </Text>
    //               <Text as="p" variant="bodyMd">
    //                 Generate a product with GraphQL and get the JSON output for
    //                 that product. Learn more about the{" "}
    //                 <Link
    //                   url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
    //                   target="_blank"
    //                   removeUnderline
    //                 >
    //                   productCreate
    //                 </Link>{" "}
    //                 mutation in our API references.
    //               </Text>
    //             </BlockStack>
    //             <InlineStack gap="300">
    //               <Button loading={isLoading} onClick={generateProduct}>
    //                 Generate a product
    //               </Button>
    //               {fetcher.data?.product && (
    //                 <Button
    //                   url={`shopify:admin/products/${productId}`}
    //                   target="_blank"
    //                   variant="plain"
    //                 >
    //                   View product
    //                 </Button>
    //               )}
    //             </InlineStack>
    //             {fetcher.data?.product && (
    //               <>
    //                 <Text as="h3" variant="headingMd">
    //                   {" "}
    //                   productCreate mutation
    //                 </Text>
    //                 <Box
    //                   padding="400"
    //                   background="bg-surface-active"
    //                   borderWidth="025"
    //                   borderRadius="200"
    //                   borderColor="border"
    //                   overflowX="scroll"
    //                 >
    //                   <pre style={{ margin: 0 }}>
    //                     <code>
    //                       {JSON.stringify(fetcher.data.product, null, 2)}
    //                     </code>
    //                   </pre>
    //                 </Box>
    //                 <Text as="h3" variant="headingMd">
    //                   {" "}
    //                   productVariantsBulkUpdate mutation
    //                 </Text>
    //                 <Box
    //                   padding="400"
    //                   background="bg-surface-active"
    //                   borderWidth="025"
    //                   borderRadius="200"
    //                   borderColor="border"
    //                   overflowX="scroll"
    //                 >
    //                   <pre style={{ margin: 0 }}>
    //                     <code>
    //                       {JSON.stringify(fetcher.data.variant, null, 2)}
    //                     </code>
    //                   </pre>
    //                 </Box>
    //               </>
    //             )}
    //           </BlockStack>
    //         </Card>
    //       </Layout.Section>
    //       <Layout.Section variant="oneThird">
    //         <BlockStack gap="500">
    //           <Card>
    //             <BlockStack gap="200">
    //               <Text as="h2" variant="headingMd">
    //                 App template specs
    //               </Text>
    //               <BlockStack gap="200">
    //                 <InlineStack align="space-between">
    //                   <Text as="span" variant="bodyMd">
    //                     Framework
    //                   </Text>
    //                   <Link
    //                     url="https://remix.run"
    //                     target="_blank"
    //                     removeUnderline
    //                   >
    //                     Remix
    //                   </Link>
    //                 </InlineStack>
    //                 <InlineStack align="space-between">
    //                   <Text as="span" variant="bodyMd">
    //                     Database
    //                   </Text>
    //                   <Link
    //                     url="https://www.prisma.io/"
    //                     target="_blank"
    //                     removeUnderline
    //                   >
    //                     Prisma
    //                   </Link>
    //                 </InlineStack>
    //                 <InlineStack align="space-between">
    //                   <Text as="span" variant="bodyMd">
    //                     Interface
    //                   </Text>
    //                   <span>
    //                     <Link
    //                       url="https://polaris.shopify.com"
    //                       target="_blank"
    //                       removeUnderline
    //                     >
    //                       Polaris
    //                     </Link>
    //                     {", "}
    //                     <Link
    //                       url="https://shopify.dev/docs/apps/tools/app-bridge"
    //                       target="_blank"
    //                       removeUnderline
    //                     >
    //                       App Bridge
    //                     </Link>
    //                   </span>
    //                 </InlineStack>
    //                 <InlineStack align="space-between">
    //                   <Text as="span" variant="bodyMd">
    //                     API
    //                   </Text>
    //                   <Link
    //                     url="https://shopify.dev/docs/api/admin-graphql"
    //                     target="_blank"
    //                     removeUnderline
    //                   >
    //                     GraphQL API
    //                   </Link>
    //                 </InlineStack>
    //               </BlockStack>
    //             </BlockStack>
    //           </Card>
    //           <Card>
    //             <BlockStack gap="200">
    //               <Text as="h2" variant="headingMd">
    //                 Next steps
    //               </Text>
    //               <List>
    //                 <List.Item>
    //                   Build an{" "}
    //                   <Link
    //                     url="https://shopify.dev/docs/apps/getting-started/build-app-example"
    //                     target="_blank"
    //                     removeUnderline
    //                   >
    //                     {" "}
    //                     example app
    //                   </Link>{" "}
    //                   to get started
    //                 </List.Item>
    //                 <List.Item>
    //                   Explore Shopify’s API with{" "}
    //                   <Link
    //                     url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
    //                     target="_blank"
    //                     removeUnderline
    //                   >
    //                     GraphiQL
    //                   </Link>
    //                 </List.Item>
    //               </List>
    //             </BlockStack>
    //           </Card>
    //         </BlockStack>
    //       </Layout.Section>
    //     </Layout>
    //   </BlockStack>
    // </Page>
    <Page title="Dashboard">
      <BlockStack gap="400">
        <BlockStack>
        <div style={{width: "100%", paddingBottom: "1rem"}}>
          <ProgressBar progress={wishlistItem.length + 1 || 0} />
        </div>
          <Text as="p" fontWeight="medium">
            {wishlistItem.length + 1 || 0 }/100 Wishlist additions
          </Text>
        </BlockStack>
        <Layout>
          <Layout.Section variant="oneThird">
            <Card>
              <Text as="h3" variant="headingSm" fontWeight="medium">Wishlist page view</Text>
              <Text variant="headingLg"> {wishlistItem.length + 1 || 0 }</Text> 
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <Text as="h3" variant="headingSm" fontWeight="medium">Total wishlist</Text>
              <Text variant="headingLg"> {wishlistItem.size || 0 }</Text>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <Text as="h3" variant="headingSm" fontWeight="medium">Total customers in Wishlist</Text>
              <Text variant="headingLg">{uniqueCustomers.size || 0}</Text>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <Text as="h3" variant="headingSm" fontWeight="medium">Unique product in wishlist</Text>
              <Text variant="headingLg">{uniqueProducts.size || 0}</Text>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <Text as="h2" variant="headingSm" fontWeight="medium">Cart from wishlist</Text>
              <Text variant="headingLg">0</Text>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <Text as="h3" variant="headingSm" fontWeight="medium">Order from wishlist</Text>
              <Text variant="headingLg">0</Text>
            </Card>
          </Layout.Section>
        </Layout>

        <Card>
          <BlockStack gap="300">
            <Text variant="headingMd">App setup and activation</Text>
            <BlockStack gap="200">
              <InlineStack gap="200">
                <Badge status="success">Theme integration</Badge>
                <Text>Enable the embed app block from theme editor.</Text>
                <Button
                  onClick={() => navigate('/admin/themes')}
                  variant="primary"
                >
                  Theme editor
                </Button>
              </InlineStack>

              <Divider />

              <InlineStack gap="200">
                <Badge status="success">Product page integration</Badge>
              </InlineStack>

              <Divider />

              <InlineStack gap="200">
                <Badge status="success">Button settings</Badge>
              </InlineStack>

              <Divider />

              <InlineStack gap="200">
                <Badge>Leave feedback</Badge>
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
