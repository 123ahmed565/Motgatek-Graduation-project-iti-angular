export class User {

    constructor(
        public id: number, public fName: string, public lName: string,
        public address: any[], public deliveryAddress: any, public email: string, public password: string,
        public phone: string, public gender: string, public nationality: string,
        public birthDate: Date
    ) { }
}
