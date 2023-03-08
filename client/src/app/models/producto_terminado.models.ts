export interface Producto_terminado {
    id?: number;
    nombre?: string;
    imagen?: string;
    ingredientes?: Ingrediente[];
  }
  export interface Ingrediente {
    id?: number;
    receta_id?: number;
    materia_prima?: string;
    cantidad?: string;
    unidad_medida?: string;
  }