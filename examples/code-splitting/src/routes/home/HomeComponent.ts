import * as moment from 'moment';

export class HomeComponent {
    public name: string;
    constructor() {
        this.name = `Hello, i am home at ${moment().format('YYYY MM DD')}`
    }
}