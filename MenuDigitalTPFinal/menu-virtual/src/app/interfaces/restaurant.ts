

export interface Restaurant{
    id: number;
    firstName: string;
    lastName: string;
    localName: string;
    imageUrl: string;
    bioImageUrl: string;
    description: string;
    password: string;
    email: string;
    happyHour: boolean;
}
export type FormRestaurant = Omit<Restaurant, 'id' | 'imageUrl' | 'bioImageUrl' | 'descriprion'|'happyHour'>
export type RestaurantForEdit = Omit<Restaurant, 'id'|'happyHour'>