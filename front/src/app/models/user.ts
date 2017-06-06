export class User {
    name: string;
    _id: number;
    token: string;
    image: string;
    imageURL: string;
    email: string;
    phone: number;
    constructor(name: string, _id: number, token: string, image: string = null, imageURL: string = null, email: string = null, phone: number = null) {
        this.name = name;
        this._id = _id;
        this.token = token;
        this.image = image;
        this.imageURL = imageURL;
        this.email = email;
        this.phone = phone;
    }
}

