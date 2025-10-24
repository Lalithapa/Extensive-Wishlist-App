import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  BillingInterval,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";

export const MONTHLY_PLAN = "Monthly subscription";
export const ANNUAL_PLAN = "Annual subscription";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  // ✅ Use ONE place to set API version (match your TOML 2025-07)
  api: { apiVersion: "2025-07" },

  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,

  billing: {
    [MONTHLY_PLAN]: {
      amount: 449,
      currencyCode: "USD",
      interval: BillingInterval.Every30Days,
    },
    [ANNUAL_PLAN]: {
      amount: 3999,
      currencyCode: "USD",
      interval: BillingInterval.Annual,
    },
  },

  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: false,
  },

  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
// Optional export (keep if used elsewhere)
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
