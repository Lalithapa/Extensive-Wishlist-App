import { redirect } from '@remix-run/react';
import {
  Page,
  Layout,
  LegacyCard,
  BlockStack,
  CalloutCard,
  List,
  Button,
} from '@shopify/polaris';
import React from 'react';

export default function Pricing() {
  let plans = [
    {
      title: 'Free Plan',
      description: 'Free Plan Description',
      action: 'Upgrade to Pro',
      actionUrl: '/app/upgrade',
      features: [
        'Upto 100 Wishlist Item',
        'Guest wishlist',
        'Customize Button & Icon',
        'Wishlist Page',
        'Basic Insights',
        'Share wishlist',
        'Import Wishlist Data'
      ]
    },
    {
      title: 'Premium Plan',
      description: 'Premium Plan Description',
      action: 'Upgrade to Pro',
      actionUrl: '/app/upgrade',
      features: [
        'Unlimited Wishlist items',
        'Guest wishlist',
        'Customize Button & Icon',
        'Wishlist Page',
        'Custome Branding',
        'Advanced Insights',
        'Facebook Pixel Integration',
      ]
    }
  ]
  return (
    <Page title="Pricing">
      <Layout>
        <Layout.Section variant="fullWidth">
          <CalloutCard
            title="Upgrade to Pro Plan"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Upgrade Plan',
              url: '/app/upgrade',
            }}
          >
            <p>Upgrade Your plan to get all the features</p>
          </CalloutCard>
        </Layout.Section>
        {
          plans.map((element, index) => (
            <Layout.Section variant="oneThird" key={index}>
              <LegacyCard title={element.title} sectioned>
                <BlockStack gap="100" >
                  <List type="bullet">
                    {element.features.map((feature, index) => (
                      <List.Item key={index}>{feature}</List.Item>
                    ))}
                  </List>
                  <Button primary url={element.actionUrl}>{element.action}</Button>
                </BlockStack>
              </LegacyCard>
            </Layout.Section>
          ))
        }
      </Layout>
    </Page>
  );
}

