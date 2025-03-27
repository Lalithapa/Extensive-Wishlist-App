
import { json, useLoaderData , Form } from "@remix-run/react";
import { BlockStack, Box, Card, InlineGrid, Button, Page, Text, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import db from "../db.server";
import { redirect } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";


export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  const billingCheck = await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true,
    onFailure: () => redirect('/app/settings'),
  });

  const subscription = billingCheck.appSubscriptions[0];
  console.log(`Shop is on ${subscription.name} (id ${subscription.id})`);
  let settings = await db.settings.findFirst();
  return json(settings)
};

export async function action({ request }) {
  let formData = await request.formData();
  let settings = Object.fromEntries(formData);

  await db.settings.upsert({
    where: {
      id: "1"
    },
    update: {
      id: "1",
      shop: settings?.shop,
      description: settings?.description
    },
    create: {
      id: "1",
      shop: settings?.shop,
      description: settings?.description
    }
  });

  return json(settings);
}

export default function Settings() {
  const settings  = useLoaderData();
  const [isFormUpdated, setIsFormUpdated] = useState(false);
  const [storeDetails, setStoreDetails] = useState(settings);

  const updateForm = (key, value) => {
    setStoreDetails({
      ...storeDetails,
      [key]: value
    });
    setIsFormUpdated(true);
  };
  useEffect(() => {
    setIsFormUpdated(false);
  }, [])


  return (
    <Page
      divider
      primaryAction={{ content: "View on your store", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
      ]}
    >
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Store Name
              </Text>
              <Text as="p" variant="bodyMd">
                Your store name is the name of your store. It appears on your online store, invoices, and receipts.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
          <Form method="POST" >
              <BlockStack gap="400">
                <TextField label="Name" name="shop" value={ storeDetails?.shop } onChange={(value)=>updateForm('shop',value)} />
                <TextField label="Description" name="description" value={ storeDetails?.description }  onChange={(value)=>updateForm('description',value)} />
                  <Button submit={true} disabled={!isFormUpdated} >Save Data</Button>
              </BlockStack>
           </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  )
}
