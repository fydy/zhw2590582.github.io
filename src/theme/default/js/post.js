import "../scss/post.scss";
import Highway from "@dogstudio/highway/build/es5/highway";
import { queryStringify } from "./utils";
import { getIssueById } from "./api";

export default class Renderer extends Highway.Renderer {
  onEnter() {
    console.log(Renderer.name, "onEnter");
  }
  onLeave() {
    console.log(Renderer.name, "onLeave");
  }
  onEnterCompleted() {
    console.log(Renderer.name, "onEnterCompleted");
  }
  onLeaveCompleted() {
    console.log(Renderer.name, "onLeaveCompleted");
  }
}
