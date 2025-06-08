import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "logo.svg", "robots.txt"],
      manifest: {
        name: "AdaSampah",
        short_name: "AdaSampah",
        description:
          "AdaSampah adalah platform pelaporan dan edukasi pengelolaan sampah yang menghubungkan masyarakat dengan pemerintah untuk mewujudkan lingkungan bersih dan lestari. Dilengkapi fitur unggulan 'Kenali Sampahmu' untuk identifikasi, solusi penanganan, dan inspirasi pemanfaatan sampah.",
        theme_color: "#096b69",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },

          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/images/screenshot1.png",
            sizes: "1896x1026",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshot2.png",
            sizes: "1896x1026",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshot3.png",
            sizes: "1896x1026",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshot4.png",
            sizes: "1896x1026",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshot5.png",
            sizes: "1896x1026",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/images/screenshot6.png",
            sizes: "1896x1026",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/(fonts.googleapis.com|fonts.gstatic.com)\/.*$/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern:
              /^https:\/\/unpkg.com\/.*|https:\/\/cdn.maptiler.com\/.*|https:\/\/api.maptiler.com\/.*$/,
            handler: "CacheFirst",
            options: {
              cacheName: "external-assets",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            // Perbaikan: cache semua asset lokal hasil build (termasuk jpg/png di /assets/)
            urlPattern: /\/assets\/.*|.*\.(png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "image-assets",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 60 },
            },
          },
          {
            // Perluas pattern agar semua endpoint laporan/statistik tercache
            urlPattern: /\/reports(\/.*)?|\/reports$|\/reports\?.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            // Untuk semua endpoint laporan/statistik di backend (localhost:9000)
            urlPattern:
              /^http:\/\/localhost:9000\/reports(\/.*)?|^http:\/\/localhost:9000\/reports(\?.*)?$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            // Untuk endpoint paginasi laporan (misal: /reports/limit)
            urlPattern: /^http:\/\/localhost:9000\/reports\/limit(\?.*)?$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            // Untuk semua endpoint user di backend (localhost:9000)
            urlPattern:
              /^http:\/\/localhost:9000\/user(\/.*)?|^http:\/\/localhost:9000\/user(\?.*)?$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "user-api-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
        ],
      },
    }),
  ],
});
