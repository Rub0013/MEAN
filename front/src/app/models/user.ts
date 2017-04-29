export class User {
    name: string;
    email: string;
    phone: number;
    _id: number;
    constructor(name: string,email: string, phone: number) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this._id = null;
    }
}

