export interface User {
    
    id?: number,
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    address?: any[],
    deliveryAddress?: any,
    phone?: string,
    gender?: string,
    nationality?: string,
    birthDate?: Date
}