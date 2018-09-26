import "normalize.css";
import Highway from "@dogstudio/highway/build/es5/highway";

export default new Highway.Core({
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