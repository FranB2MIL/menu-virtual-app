export interface Product{
    id: number,
    name: string,
    description: string,
    descuento: number;
    price: string,
    imageUrl: string,
    categoryId: number
}
export type NewProduct = Omit<Product, 'id'>