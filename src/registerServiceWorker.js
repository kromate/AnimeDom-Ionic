import { googleFontsCache, imageCache, offlineFallback, pageCache, staticResourceCache } from 'workbox-recipes';

import { register } from "register-service-worker";

// import { precacheAndRoute } from 'workbox-precaching';


// precacheAndRoute(self.__WB_MANIFEST);

offlineFallback();
staticResourceCache();
pageCache();
imageCache();
googleFontsCache();

// import.meta.env.NODE_ENV === "production"

  register(`${import.meta.env.BASE_URL}sw.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      caches.keys().then(function(names) {
        for (let name of names) caches.delete(name);
      });
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });


