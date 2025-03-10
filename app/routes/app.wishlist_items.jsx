import { json } from '@remix-run/node';
import { LegacyCard, EmptyState, Page, DataTable } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import db from "../db.server";
import { useLoaderData } from '@remix-run/react';
import { authenticate } from '../shopify.server';

export async function loader({ request }) {
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
  return json(wishlist);
}

export default function Wishlist_Lists() {
  const wishlist = useLoaderData();
  const [allWishlist, setAllWishlist] = useState([]);
  useEffect(() => {
    const dataRow = wishlist.map((item) => [
      item.customerId,
      item.productId,
      item.shop,
      item.createdAt,
    ]);
    setAllWishlist(dataRow);
  }, [wishlist]); // Updates only when wishlist changes
  return (
    <>
      <Page title="All Wishlists">
        <LegacyCard sectioned>
          {allWishlist.length > 0 ?
            <DataTable
              columnContentTypes={[
                'numeric',
                'numeric',
                'text',
                'numeric',
              ]}
              headings={[
                'Customer ID',
                'Product ID',
                'Shop link',
                'Created At'
              ]}
              rows={allWishlist}
            /> : <EmptyState
              heading="Ad Prodcts to Wishlist"
              action={{ content: 'Add transfer' }}
              secondaryAction={{
                content: 'Learn more',
                url: 'https://help.shopify.com',
              }}
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>Check All wishlist Designs</p>
            </EmptyState>
          }
        </LegacyCard>
      </Page>
    </>
  );
}