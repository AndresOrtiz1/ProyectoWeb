export interface Recetas {
    id?: number;
    nombrereceta?: string;
    ingredientes?: Ingrediente[];
}
interface Ingrediente {
    producto: string;
    cantidad: number;
}