import { homeHelpers } from "./HomeHelpers";
import { sharedFunction } from "../shared";

export class HomeComponent {
    constructor() {
        console.log("i am home component", homeHelpers(), sharedFunction());
    }
}