import {
    Page,
    FormLayout,
    TextField,
    LegacyStack,
    Text,
    InlineGrid,
  } from "@shopify/polaris";
import { useState } from "react";
  
  export default function Settings() {
    const [storeName, setStoreName] = useState("");
    const [accountEmail, setAccountEmail] = useState("");
    return (
      <Page>
        <LegacyStack vertical>
            <Text variant="heading2xl" as="h3">
               Dashboard
            </Text>
        </LegacyStack>

        <SpacingBackground>
      <InlineGrid gap="400" columns={3}>
        <Placeholder height="320px" />
        <Placeholder height="320px" />
        <Placeholder height="320px" />
      </InlineGrid>
    </SpacingBackground>
        <FormLayout >
            <TextField label="Store name"
                    onChange={(value) => setStoreName(value)}
                    autoComplete="off"
                    value={storeName} />
            <TextField
                    type="email"
                    label="Account email"
                    onChange={(value) => setAccountEmail(value)}
                    autoComplete="email"
                    value={accountEmail}
                />
        </FormLayout>
      </Page>
    );
  } 
  const SpacingBackground = ({ children, width = '100%' }) => {
    return (
      <div
        style={{
          background: 'var(--p-color-bg-surface-success)',
          width,
          height: 'auto',
        }}
      >
        {children}
      </div>
    );
  };
  
  const Placeholder = ({height = 'auto', width = 'auto'}) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--p-color-bg-surface)',
          height: height ?? undefined,
          width: width ?? undefined,
        }}
      ><Text>Text</Text> </div>
    );
  };