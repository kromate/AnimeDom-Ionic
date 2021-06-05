import { register } from "register-service-worker";

import { offlineFallback, staticResourceCache,pageCache, imageCache, googleFontsCache  } from 'workbox-recipes';
// import { precacheAndRoute } from 'workbox-precaching';


// precacheAndRoute(self.__WB_MANIFEST);

offlineFallback();
staticResourceCache();
pageCache();
imageCache();
googleFontsCache();

// process.env.NODE_ENV === "production"

  register(`${process.env.BASE_URL}sw.js`, {
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


