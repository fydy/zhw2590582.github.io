import "normalize.css";
import "../scss/common";
import "github-markdown-css";
import "overlayscrollbars/css/OverlayScrollbars.min.css";
import Highway from "@dogstudio/highway/build/es5/highway";
import Transition from "./transition";
import { smoothScroll, scrollFixed } from "./utils";

let scrollMenuView = false;
scrollFixed('.layout', 0, type => {
  scrollMenuView = type;
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
  },
  transitions: {
    default: Transition
  }
});

Highway.update = function () {
  H.detach();
  H.attach();
}

H.on('NAVIGATE_END', (to, from, location) => {
  scrollMenuView && smoothScroll(to.view, -50);
});