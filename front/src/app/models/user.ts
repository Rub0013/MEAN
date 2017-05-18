export class User {
    name: string;
    phone: number;
    email: string;
    password: any;
    _id: number;
    image: string;
    constructor(name: string, phone: number, email: string, password: any) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}

