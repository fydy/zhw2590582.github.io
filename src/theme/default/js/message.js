import Gitting from 'gitting';
import { setTitle } from "./utils";
import "../sass/pages";
import "../sass/message";
import "gitting/dist/gitting.css";

setTitle('留言');
const gitting = new Gitting(__config__.website.gitting);
gitting.render('#gitting-container');
