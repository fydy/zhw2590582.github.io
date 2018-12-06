import Highway from "@dogstudio/highway";
import fade from "./fade";

export default class Transition extends Highway.Transition {
  in(view, done) {
    fade.fadeIn(view, {
        duration: 300,
        complete: done
    })
  }

  out(view, done) {
    fade.fadeOut(view, {
        duration: 150,
        complete: done
    })
  }
}
