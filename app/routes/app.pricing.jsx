import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
  Card,
  BlockStack,
  Box,
} from '@shopify/polaris';
import React from 'react';

export default function Pricing() {
  return (
    <Page fullWidth>
      <Layout>
      <Layout.Section variant="fullWidth">
          <Card roundedAbove="sm">
              <Text as="h2" variant="headingSm">
              Upgrade to Pro Plan
              </Text>
              <Box paddingBlockStart="200">
                <Text as="p" variant="bodyMd">
                Upgrade Your plan to get all the features
                </Text>
              </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
        <LegacyCard title="Free Plan" sectioned>
          <BlockStack gap="100">
            <Placeholder height="auto" label="Start" />
            <Placeholder height="auto" label="adasdasdasd" />
            <Placeholder height="auto" label="Start" />
          </BlockStack>
        </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Nevada" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                301 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '344',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '100',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '259',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

const Placeholder = ({label = '',height = 'auto'}) => {
  return (
    <div
      style={{
        padding: '6px var(--p-space-200)',
        height: height,
      }}
    >
       <Text
            as="h2"
            variant="bodyMd"
            fontWeight="regular"
          >
            {label}
          </Text>
    </div>
  );
};
