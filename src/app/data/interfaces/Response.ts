import { Producto } from '../interfaces/Producto';

export interface Response {
    status?: string | number;
    description?: string;
    error?: string;
    path?: string;
    timestamp?: Date;
    productos?: Producto[];
}