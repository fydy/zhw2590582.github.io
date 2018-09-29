import "normalize.css";
import "../scss/common";
import "github-markdown-css";
import "overlayscrollbars/css/OverlayScrollbars.min.css";
import Highway from "@dogstudio/highway/build/es5/highway";
import OverlayScrollbars from "overlayscrollbars";
import { smoothScroll, scrollFixed } from "./utils";
import Transition from "./transition";

let scrollMenuView = false;
let scrollbar = null;
scrollFixed('.layout', 100, type => {
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

document.addEventListener("DOMContentLoaded", function() {
	scrollbar = OverlayScrollbars(document.querySelectorAll("body"), {});
});

H.on('NAVIGATE_END', (to, from, location) => {
  scrollMenuView && smoothScroll(to.view, -20);
  scrollbar.update();
});