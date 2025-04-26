import {
  SkeletonPage,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  Card,
  Text,
} from '@shopify/polaris';
import React from 'react';

 export default function SkeletonExample() {
  return (
    <SkeletonPage fullWidth="true">
     <Layout>
                <Layout.Section variant="oneThird" title="Organization" subdued>
                  <Card>
                    <Text as="h3" variant="headingSm" fontWeight="medium" >Wishlist page view</Text>
                     <SkeletonBodyText lines={1} style={{marginTop: "5px",paddingTop: "5px"}}/>
                  </Card>
                </Layout.Section>
      
                <Layout.Section variant="oneThird">
                  <Card>
                    <Text as="h3" variant="headingSm" fontWeight="medium">Total wishlist</Text>
                     <SkeletonBodyText lines={1} />
                  </Card>
                </Layout.Section>
      
                <Layout.Section variant="oneThird">
                  <Card>
                    <Text as="h3" variant="headingSm" fontWeight="medium">Total customers in Wishlist</Text>
                    <SkeletonBodyText lines={1} />
                  </Card>
                </Layout.Section>
      
                <Layout.Section variant="oneThird">
                  <Card>
                    <Text as="h3" variant="headingSm" fontWeight="medium">Unique product in wishlist</Text>
                    <SkeletonBodyText lines={1} />
                  </Card>
                </Layout.Section>
      
                <Layout.Section variant="oneThird">
                  <Card>
                    <Text as="h2" variant="headingSm" fontWeight="medium">Cart from wishlist</Text>
                    <SkeletonBodyText lines={1} />
                  </Card>
                </Layout.Section>
      
                <Layout.Section variant="oneThird">
                  <Card>
                    <Text as="h3" variant="headingSm" fontWeight="medium">Order from wishlist</Text>
                    <SkeletonBodyText lines={1} />
                  </Card>
                </Layout.Section>
              </Layout>
       
    </SkeletonPage>
  );
}