import { LegacyCard, DataTable, Text } from '@shopify/polaris';
import React from 'react';

export default function TopWishlistProducts({ allWishlist }) {
  // Pick only first 10 products
  const topProducts = allWishlist.slice(0, 10);

  // Map the required data
  const rows = topProducts.map((productRow, index) => [
    // Title (productRow[1]) with link (productRow[2])
    <Text variant="bodyMd" fontWeight="medium" as="span" key={index}>
      {productRow[2]}
    </Text>,
    1, // Hardcoded Wishlist Count, you can replace later if dynamic
  ]);

  return (
    <LegacyCard title="Top 10 Items in Public Wishlists" sectioned>
      <DataTable
        columnContentTypes={['text', 'numeric']}
        headings={['Product', 'Wishlist count']}
        rows={rows}
      />
    </LegacyCard>
  );
}
