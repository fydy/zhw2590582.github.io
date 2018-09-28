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

H.on('NAVIGATE_OUT', (from, location) => {
  loading.setColor('#000').start();
  console.log('NAVIGATE_OUT')
});

H.on('NAVIGATE_IN', (to, location) => {
  console.log('NAVIGATE_IN')
});

H.on('NAVIGATE_END', (to, from, location) => {
  loading.stop();
  scrollMenuView && smoothScroll(to.view, -100);
});

export default H;