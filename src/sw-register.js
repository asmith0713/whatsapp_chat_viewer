// src/sw-register.js
export function registerServiceWorker() {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL || ''}/sw.js`;
        console.log('[PWA] Registering service worker at', swUrl);
        navigator.serviceWorker.register(swUrl)
          .then(reg => console.log('[PWA] ServiceWorker registered:', reg))
          .catch(err => console.warn('[PWA] ServiceWorker registration failed:', err));
      });
    } else {
      console.log('[PWA] ServiceWorker registration skipped (not production)');
    }
  }
  
  window.deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    window.dispatchEvent(new CustomEvent('pwa-install-available'));
    console.log('[PWA] beforeinstallprompt captured');
  });
  window.addEventListener('appinstalled', () => {
    window.deferredPrompt = null;
    window.dispatchEvent(new CustomEvent('pwa-installed'));
    console.log('[PWA] appinstalled');
  });
  