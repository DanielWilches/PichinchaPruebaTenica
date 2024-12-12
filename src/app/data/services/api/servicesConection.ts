
// Objetivo: Conectar con la API
import { Producto } from '../../interfaces/Producto';
import { Response } from '../../interfaces/Response';
import { Constants } from '../../constants/constants';

export class ServicesConnection {
    constructor() {}

    public async GetProducts(): Promise<Response> {
        try {
            let response:Response = await fetch(`${Constants.URL_BASE}${Constants.IPF_MSA}${Constants.BP_PRODUCTS}`,
                {
                    method: Constants.GET,
                    headers: {
                        'Content-Type': Constants.CONTENT_TYPE_JSON,
                        'authorId': '1234567890DEVTECNICA'
                    },
                });
    
            if (response.status === 200) 
            {
                return response;
            }
            else 
            {
                return  {
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
            let response:Response = await fetch(`${Constants.URL_BASE}${Constants.IPF_MSA}${Constants.BP_PRODUCTS}`, {
                method: Constants.POST,
                headers: {
                    'Content-Type': Constants.CONTENT_TYPE_JSON,
                    'authorId': '1234567890DEVTECNICA'
                },
                body: JSON.stringify(data)
            });
    
            if (response.status === 200) 
            {
                return response;
            }
            else 
            {
                return  {
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

    public async UpdateProduct( data: Producto): Promise<Response> {
        try {
            const response:Response = await fetch(`${Constants.URL_BASE}${Constants.IPF_MSA}${Constants.BP_PRODUCTS}`, {
                method: Constants.PUT,
                headers: {
                    'Content-Type': Constants.CONTENT_TYPE_JSON,
                    'authorId': '1234567890DEVTECNICA'
                },
                body: JSON.stringify(data)
            });
    
            if (response.status === 200) 
            {
                return response;
            }
            else 
            {
                return  {
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

    public async deleteProducts(id:string): Promise<Response> {
        try {
            let response:Response = await fetch(`${Constants.URL_BASE}${Constants.IPF_MSA}${Constants.BP_PRODUCTS}?id=${id}`, {
                method: Constants.DELETE,
                headers: {
                    'Content-Type':Constants.CONTENT_TYPE_JSON,
                    'authorId': '1234567890DEVTECNICA'
                },
            });
    
            if (response.status === 200) 
            {
                return response;
            }
            else 
            {
                return  {
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
            let response:Response = await fetch(`${Constants.URL_BASE}${Constants.IPF_MSA}${Constants.BP_PRODUCTS_VERIFICATION}?id=${id}`,
                {
                    method: Constants.GET,
                    headers: {
                        'Content-Type': Constants.CONTENT_TYPE_JSON,
                        'authorId': '1234567890DEVTECNICA'
                    }
                });
            if (response.status === 200) {
                return response;
            }else{
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

