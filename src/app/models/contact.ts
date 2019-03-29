import { Phone } from './phone';

export class Contact {
    id: string;
    firstName: string;
    lastName: string;
    imgUrl: string;
    email?: string;
    favorite: boolean = false;
    numbers?: Phone[] = [];

    constructor(uuid: string, firstName: string, lastName: string) {
        this.id = uuid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imgUrl = "";
    }
}