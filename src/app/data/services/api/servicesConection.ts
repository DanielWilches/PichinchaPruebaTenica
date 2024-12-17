import { Producto } from '../../interfaces/Producto';
import { Constants } from '../../constants/constants';
import { Response } from '../../interfaces/Response';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({   providedIn: 'root'})
export class ServicesConnection {
    constructor(private http: HttpClient) {}

    public async GetProducts(): Promise<Response> {
        let URL = `${Constants.URL_BASE}${Constants.BP_PRODUCTS}`;
        try {
            let response: any = await this.http.get(URL, {
                headers: {
                    'authorId': 'prueba01'
                }
            }).toPromise();
            console.log('response', response);
            if (response.status === 200) {
                return response;
            } else {
                return {
                    status: response?.status ?? Constants.CODE_400,
                    description: `${Constants.DESCRIPCION_FALLIDA} -${response?.description ?? ""}`,
                    error: Constants.ERROR,
                    productos: []
                };
            }
        } catch (error) {
            return {
                status: Constants.CODE_404,
                description: `${Constants.DESCRIPCION_FALLIDA}-${error}-AL OBTENER PRODUCTOS`,
                error: Constants.FAILED,
                productos: []
            };
        }
    }

    public async CreateProduct(data: Producto): Promise<Response> {
        try {
            let url = `${Constants.URL_BASE}${Constants.BP_PRODUCTS}`;
            let response: any = await this.http.post(url, data, {
                headers: {
                    'Content-Type': Constants.CONTENT_TYPE_JSON,
                    'authorId': '1234567890DEVTECNICA'
                }
            }).toPromise();
            if (response.status === 200) {
                return response;
            } else {
                return {
                    status: response?.status ?? Constants.CODE_400,
                    description: `${Constants.DESCRIPCION_FALLIDA}-AL CREAR PRODUCTOS`,
                    error: Constants.ERROR,
                    productos: []
                };
            }
        } catch (error) {
            return {
                status: Constants.CODE_404,
                description: `${Constants.DESCRIPCION_FALLIDA}-${error}`,
                error: Constants.FAILED,
                productos: []
            };
        }
    }

    public async UpdateProduct(data: Producto): Promise<Response> {
        try {
            let url = `${Constants.URL_BASE}${Constants.BP_PRODUCTS}`;
            let response: any = await this.http.put(url, data, {
                headers: {
                    'Content-Type': Constants.CONTENT_TYPE_JSON,
                    'authorId': '1234567890DEVTECNICA'
                }
            }).toPromise();
            if (response.status === 200) {
                return response;
            } else {
                return {
                    status: response?.status ?? Constants.CODE_400,
                    description: `$${Constants.DESCRIPCION_FALLIDA}-${response?.description ?? ""}`,
                    error: Constants.ERROR,
                };
            }
        } catch (error) {
            return {
                status: Constants.CODE_404,
                description: `${Constants.DESCRIPCION_FALLIDA}-${error}-AL ACTUALIZAR PRODUCTOS`,
                error: Constants.FAILED,
            };
        }
    }

    public async deleteProducts(id: string): Promise<Response> {
        try {
            let url = `${Constants.URL_BASE}${Constants.BP_PRODUCTS}?id=${id}`;
            let response: any = await this.http.delete(url, {
                headers: {
                    'Content-Type': Constants.CONTENT_TYPE_JSON,
                    'authorId': '1234567890DEVTECNICA'
                }
            }).toPromise();
            if (response.status === 200) {
                return response;
            } else {
                return {
                    status: response?.status ?? Constants.CODE_400,
                    description: `${Constants.DESCRIPCION_FALLIDA}-${response?.description ?? ""}`,
                    error: "FAILED",
                };
            }
        } catch (error) {
            return {
                status: Constants.CODE_404,
                description: `${Constants.DESCRIPCION_FALLIDA}-${error}-AL ACTUALIZAR PRODUCTOS`,
                error: Constants.FAILED,
            };
        }
    }

    public async ProductExists(id: string): Promise<Response> {
        try {
            let url = `${Constants.URL_BASE}${Constants.BP_PRODUCTS_VERIFICATION}?id=${id}`;
            let response: any = await this.http.get(url, {
                headers: {
                    'Content-Type': Constants.CONTENT_TYPE_JSON,
                    'authorId': '1234567890DEVTECNICA'
                }
            }).toPromise();
            if (response.status === 200) {
                return response;
            } else {
                return {
                    status: Constants.CODE_400,
                    description: `${Constants.DESCRIPCION_FALLIDA}-${response?.description ?? ""}`,
                    error: Constants.ERROR,
                };
            }
        } catch (error) {
            return {
                status: Constants.CODE_400,
                description: `${Constants.DESCRIPCION_FALLIDA}-${error}-al verificar producto`,
                error: Constants.FAILED,
            };
        }
    }
}
