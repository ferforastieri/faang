import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext's Cloudflare adapter, with everything at its default.
 *
 * Every page in this app is static and the only dynamic route is `/api/chat`,
 * so there is no ISR cache to wire up and no R2 bucket to create. Image
 * optimization is off in `next.config.ts` (the Worker has no optimizer), so
 * there is no `IMAGES` binding either.
 */
export default defineCloudflareConfig({});
