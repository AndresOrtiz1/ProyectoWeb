export interface Recetas {
    id?: number;
    nombrereceta?: string;
    ingredientes?: Ingrediente[];
}
export interface Ingrediente {
    producto?: string;
    cantidad?: number;
}