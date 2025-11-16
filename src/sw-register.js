// src/sw-register.js
export function registerServiceWorker() {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL || ''}/sw.js`;
        navigator.serviceWorker.register(swUrl).then((registration) => {
          console.log('ServiceWorker registered: ', registration);
        }).catch((err) => {
          console.error('ServiceWorker registration failed: ', err);
        });
      });
    }
  }
  
  // optional: basic beforeinstallprompt capture
  export function setupBeforeInstallPrompt() {
    window.deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
    });
  }
  