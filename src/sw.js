import { clientsClaim } from "workbox-core/clientsClaim.mjs";
import { skipWaiting } from "workbox-core/skipWaiting.mjs";
import { initialize as googleAnalyticsInitialize } from "workbox-google-analytics/initialize.mjs";
import { registerRoute } from "workbox-routing/registerRoute.mjs";
import { setCatchHandler as setRoutingCatchHandler } from "workbox-routing/setCatchHandler.mjs";
import { CacheFirst } from "workbox-strategies/CacheFirst.mjs";
import { NetworkFirst } from "workbox-strategies/NetworkFirst.mjs";
import { Plugin as ExpirationPlugin } from "workbox-expiration/Plugin.mjs";

clientsClaim();
skipWaiting();

googleAnalyticsInitialize();

registerRoute(
  /\.(js|css)$/,
  new CacheFirst({
    cacheName: "assets",
    plugins: [
      new ExpirationPlugin({
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);

registerRoute(
  /\.woff2?$/,
  new CacheFirst({
    cacheName: "assets"
  })
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);

setRoutingCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case "document":
      return caches.match("/");
    default:
      return Response.error();
  }
});
