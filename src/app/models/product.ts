export class Product {
    constructor(public id: number, public name: string, public imgSrc: string,
        public description: string, public newPrice: number,
        public oldPrice?: number, public rate?: number) { }
}
