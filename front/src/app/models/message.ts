export class Message {
    senderName: string;
    senderId: number;
    message: string;
    constructor(senderName: string, senderId: number, message: string ) {
        this.senderName = senderName;
        this.senderId = senderId;
        this.message = message;
    }
}

