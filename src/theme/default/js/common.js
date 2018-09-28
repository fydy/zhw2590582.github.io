import "normalize.css";
import "../scss/common";
import Highway from "@dogstudio/highway/build/es5/highway";
import loading from 'app-loading';
import { smoothScroll, scrollFixed } from "./utils";

let scrollMenuView = false;
const $scrollMenu = document.querySelector('.scroll-menu');
scrollFixed('.layout', 100, type => {
  scrollMenuView = type;
  $scrollMenu.classList.toggle("show", type);
});

const H = new Highway.Core({
  renderers: {
    index: () => import(/* webpackChunkName: "index" */ "./index"),
    about: () => import(/* webpackChunkName: "about" */ "./about"),
    archive: () => import(/* webpackChunkName: "archive" */ "./archive"),
    editor: () => import(/* webpackChunkName: "editor" */ "./editor"),
    message: () => import(/* webpackChunkName: "message" */ "./message"),
    post: () => import(/* webpackChunkName: "post" */ "./post"),
    404: () => import(/* webpackChunkName: "404" */ "./404")
  }
});

Highway.update = function () {
  const key = H.location.href;
  const cache = H.cache.get(key);
  if (cache) {
    cache.page = document.cloneNode(true);
    cache.view = document.querySelector("[data-router-view]").cloneNode(true);
    H.cache.set(key, cache);
    H.afterFetch();
  }
}

H.on('NAVIGATE_END', (to, from, location) => {
  scrollMenuView && smoothScroll(to.view, -100);
});