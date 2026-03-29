export interface Category{
    id: number,
    name: string,
    userId: number
}
export type NewCategory = Omit<Category, 'id'>