import { aboutHelpers } from "./AboutHelpers";
import { sharedFunction } from "../shared";
import * as moment from "moment";

export class AboutComponent {
    constructor() {
        
        console.log("i am about component", aboutHelpers(), sharedFunction());
        console.log("And moment lib is in my bundle!", moment().format());
    }
}