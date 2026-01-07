export interface Accommodation {
    id: number,
    userId: number,
    accommodationId: number,
    startDate: Date,
    endDate: Date,
    persons: number,
    totalPrice: number,
    status: boolean,
    createdAt: Date
}