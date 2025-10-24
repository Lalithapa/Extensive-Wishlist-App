import { useLoaderData } from '@remix-run/react';
import {
  Page,
  Layout,
  LegacyCard,
  BlockStack,
  CalloutCard,
  List,
  Button,
} from '@shopify/polaris';
import { authenticate } from "../shopify.server";
import { json } from '@remix-run/node'; // Make sure this is imported
import React from 'react';
export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
 try {
  const billingCheck = await billing.require({
    isTest: false,
    onFailure: () => {
          throw new Error("No Active Plan");
        }
  });

  const subscription = billingCheck.appSubscriptions[0];
  console.log(`Shop is on ${subscription.name} (id ${subscription.id})`);
  return json({billing , plan : subscription});
 } catch (error) {
  if (error.message === "No Active Plan") {
    console.log("No active plan found, redirecting to upgrade page...");
    return json({billing , plan : 'Free Plan'});
  }
 }
};
let plan_item = [
  {
    title: 'Free Plan',
    description: 'Free Plan Description',
    action: 'Free Plan',
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
    title: 'Monthly subscription',
    description: 'Monthly Plan Description',
    action: 'Monthly Plan',
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
];

export default function Pricing() {
  const { plan } = useLoaderData();
  console.log(plan, "plan");
  return (
    <Page title="Pricing">
      <Layout>
        <Layout.Section variant="fullWidth">
          <CalloutCard
            title="Upgrade to Pro Plan"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: "Cancel Plan",
              url: '/app/cancel',
            }}
          >
            <p>Upgrade Your plan to get all the features</p>
          </CalloutCard>
        </Layout.Section>
        {
          plan_item.map((element, index) => (
            <Layout.Section variant="oneThird" key={index}>
              <LegacyCard title={element.title} sectioned>
                <BlockStack gap="100" >
                  <List type="bullet">
                    {element.features.map((feature, index) => (
                      <List.Item key={index}>{feature}</List.Item>
                    ))}
                  </List>
                  <Button tone={plan.name ==  element.title ? 'success' : 'critical'} variant='primary' url={element.actionUrl}>{plan.name ==  element.title ? "Current Plan" :element.action }</Button>
                </BlockStack>
              </LegacyCard>
            </Layout.Section>
          ))
        }
      </Layout>
    </Page>
  );
}

