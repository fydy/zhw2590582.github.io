import Highway from "@dogstudio/highway";

export default class Transition extends Highway.Transition {
  in(view, done) {
    console.log("in");
    done();
  }

  out(view, done) {
    console.log("out");
    done();
  }
}
