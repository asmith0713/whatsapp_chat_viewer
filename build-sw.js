// build-sw.js
const {generateSW} = require('workbox-build');
const path = require('path');

const buildSW = async () => {
  // adjust globPatterns to include files you want cached
  const swDest = path.join(__dirname, 'build', 'sw.js');

  const {count, size, warnings} = await generateSW({
    swDest,
    globDirectory: path.join(__dirname, 'build'),
    globPatterns: [
      '**/*.{html,js,css,png,svg,ico,json}'
    ],
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: { cacheName: 'static-resources' },
      },
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: { cacheName: 'http-cache' },
      },
    ],
  });

  if (warnings && warnings.length) {
    console.warn('Workbox warnings:', warnings);
  }
  console.log(`Generated ${swDest}, which will precache ${count} files, total ${size} bytes.`);
};

buildSW().catch((err) => {
  console.error('Failed to generate service worker:', err);
  process.exit(1);
});
