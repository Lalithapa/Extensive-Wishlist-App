// app/routes/webhooks.app.uninstalled.jsx
import { authenticate } from "../shopify.server";
export async function action({ request }) {
  try {
    const { shop, payload } = await authenticate.webhook(request);
    console.log("🧹 App uninstalled:", shop, payload);
    return new Response("OK", { status: 200 });
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
}
