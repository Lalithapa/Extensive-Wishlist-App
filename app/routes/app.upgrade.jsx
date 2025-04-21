import { authenticate, MONTHLY_PLAN } from "../shopify.server";
import { json } from '@remix-run/node'; // Make sure this is imported

export const loader = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const { shop } = session;
  const shopUrl = shop.replace('.myshopify.com', '');

 try {
  await billing.require({
    plans: [MONTHLY_PLAN],
    onFailure: async () => {
      console.log("Billing required, requesting plan...", `https://admin.shopify.com/store/${shopUrl}/apps/${process.env.APP_NAME}/app/wishlist_items`);
      return billing.request({
        plan: MONTHLY_PLAN,
        isTest: true,
        returnUrl: `https://admin.shopify.com/store/${shopUrl}/apps/${process.env.APP_NAME}/app/wishlist_items`,
      });
    },
  });
} catch (error) {
  console.error("Billing failed:", error);
  throw error;
}
  return json({ status: "ok" });
};



export default function Upgrade() {
  return (
    <div>
      <h1>Plan has been upgraded</h1>
      <p>Upgrade Your plan to get all the features</p>
      <a href="/app/upgrade">Upgrade Plan</a>
    </div>
  );
}