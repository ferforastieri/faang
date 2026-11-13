import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * OpenNext's Cloudflare adapter.
 *
 * The app serves prerendered pages only (the chat is a client demo).
 * The static assets cache keeps those pages in `cdn-cgi/_next_cache` next to
 * the client assets, so a request is an asset lookup instead of a full render.
 * Without it the Worker rendered the landing and the docs on every request and
 * intermittently hit Cloudflare's 1102 (exceeded resources).
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
