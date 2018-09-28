import "../scss/post.scss";
import Highway from "@dogstudio/highway/build/es5/highway";
import { getURLParameters } from "./utils";
import api from "./api";

export default class Renderer extends Highway.Renderer {
  onEnter() {
    console.log(Renderer.name, "onEnter");
  }
}

const { id } = getURLParameters();
api.getIssueById(id).then(data => {
  console.log(data);
});