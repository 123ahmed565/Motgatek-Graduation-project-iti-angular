import { Category } from "./category.interface";

export interface Product {

    id: number,
    name: string,
    description: string,
    richDescription: string,
    brand: string,
    category: Category,
    countInStock: number,
    price: number,
    discount?: number,
    numReviews: number,
    isFeatured: boolean,
    rating?: number,
    image: File
}