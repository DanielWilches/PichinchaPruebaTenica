import { Producto } from '../interfaces/Producto';

export interface Response {
    ok: boolean;
    status?: string | number;
    statusText?: string;
    type?: number;
    url?: string;
    body?: Data;
    headers?: any;
}

interface Data {
    data?: Producto[];
}