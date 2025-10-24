import { authenticate } from "../shopify.server";

export async function action({ request }) {
  try {
    // ✅ HMAC verification + payload parsing
    const { topic, shop, payload } = await authenticate.webhook(request);

    const t = String(topic || "").toUpperCase();
    switch (t) {
      case "CUSTOMERS_DATA_REQUEST":
        // If you store customer data, prepare/return it off-thread
        break;
      case "CUSTOMERS_REDACT":
        // Delete/anonymize customer data you store
        break;
      case "SHOP_REDACT":
        // Purge shop data you store
        break;
      default:
        console.warn("Unhandled webhook topic:", topic);
    }
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook HMAC failed:", err);
    return new Response("Unauthorized", { status: 401 });
  }
}
