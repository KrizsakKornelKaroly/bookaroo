export interface Accommodation {
    id: number,
    name: string,
    description: string,
    country: string,
    city: string,
    postal: number,
    address: string,
    capacity: number,
    basePrice: number,
    active: boolean,
    createdAt: Date,
    image?: string
}