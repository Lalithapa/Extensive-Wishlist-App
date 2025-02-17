
import { json, useLoaderData , Form } from "@remix-run/react";
import { BlockStack, Box, Card, InlineGrid, Button, Page, Text, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";

//
export async function loader(){
const settings= {
  name: "My Stored",
  description: "This is my store"
}
return json(settings);
}

export async function action({request}){
  const method = request.method;
  switch(method){
    case "POST":
     return json({message: 'Data Post successfully', status: 200 , method: method});
     case "PUT":
      return json({message: 'Data Put successfully', status: 200 , method: method});
    default:
      return json({message: 'Invalid request method', status: 400, method: method});
  }
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
                <TextField label="Name" name="name" value={ storeDetails?.name } onChange={(value)=>updateForm('name',value)} />
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
