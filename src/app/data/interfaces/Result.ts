import { Producto } from '../interfaces/Producto';

export interface Result {
    status?: string | number;
    description?: string;    
    productos?: Producto[] | [];
    error?: string;
}