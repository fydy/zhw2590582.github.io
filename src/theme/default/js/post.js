import "../scss/post.scss";
import Highway from "@dogstudio/highway/build/es5/highway";
import { getURLParameters } from "./utils";
import api from "./api";
import Gitting from "gitting";
import "gitting/dist/gitting.css";

let gitting = null;
export default class Renderer extends Highway.Renderer {
  onEnter() {
    const { id } = getURLParameters();
    const $title = document.querySelector(".page-post .title");
    const $mate = document.querySelector(".page-post .mate");
    const $content = document.querySelector(".page-post .content");
    api.getIssueById(id).then(data => {
      $title.innerHTML = data.title;
      $mate.innerHTML = `<span>发布于 ${data.created_at}</span>${data.tags.map(tag => `<span><a href="archive.html?tag=${tag}">#${tag}</a></span>`)}`
      $content.innerHTML = data.html;
      gitting && gitting.destroy();
      gitting = new Gitting({
        ...__config__.website.github,
        number: id,
        initEnd: Highway.update
      });
      gitting.render("#gitting-container");
    });
  }
}
