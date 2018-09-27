import "../scss/index.scss";
import Highway from "@dogstudio/highway/build/es5/highway";
import api from "./api";
import { updateCache } from "./utils";

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