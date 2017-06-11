import { Foo, getHTMLContents } from "./foo";
import * as moment from "moment";

import "moment/locale/de";
moment.locale('de');


console.log(moment().format('LLLL'));

const first = getHTMLContents("first");
const second = getHTMLContents("second");

console.log(first, second);