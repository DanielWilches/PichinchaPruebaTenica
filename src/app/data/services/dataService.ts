import { Producto } from './../interfaces/Producto';
import { Response } from './../interfaces/Response';
import { Result } from './../interfaces/Result';
import { Injectable } from '@angular/core';
import { ServicesConnection } from './api/servicesConection';
import { Constants } from '../constants/constants';


@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private ServicesConnection: ServicesConnection) { }

    public ObtenerPruductos():Result {
        let Resultado:Result = {description:'',productos:[]};
        this.ServicesConnection.GetProducts().then(products => {
            if (products.status === Constants.CODE_200 && (products?.productos ?? []).length > 0) {
                Resultado = {
                    description: 'Productos encontrados',
                    productos: products?.productos ?? []
                };
            } else {
                Resultado = {
                    description: 'No se encontraron productos',
                    productos:[]
                };
            }
        }).catch(error => {
            console.error('No se encontraron productos:', error);
            Resultado = {
                description: 'No se encontraron productos',
                productos:[]
            };
        });
        return Resultado;
    }

    public CrearPruducto(data: Producto):Result {
        let Resultado:Result = {description:'',productos:[]};

        if (data?.name ==='' || data?.description ==='' || data?.id ==='' || data?.dateRelease === null || data?.dateRevision === null || data?.logo ==='')    
        {
            return {
                description: 'todos lo datos son obligatorios',
                productos:[]
            };
        }

        if (this.ValidarExitencia(data.id)) {

            return {
                description: 'El producto que desea crear ya existe',
                productos:[]
            };
        }

        this.ServicesConnection.CreateProduct(data).then(products => {
            if (products.status === Constants.CODE_200 && (products?.productos ?? []).length > 0) {

                Resultado = {
                    description: 'Producto creado',
                    productos: products?.productos ?? []
                };
            } else {
                Resultado = {
                    description: 'No se creo producto',
                    productos:[]
                };
            }
        }).catch(error => {
            console.error('Error creating product:', error);
            Resultado = {
                description: 'No se creo producto',
                productos:[]
            };
        });        
        return Resultado;
    }

    public ActualizarProducto(data:Producto):Result {
        let Resultado:Result = {description:'',productos:[]};
        if (data?.name ==='' || data?.description ==='' || data?.id ==='' || data?.dateRelease === null || data?.dateRevision === null || data?.logo ==='') 
        {
            return {
                description: 'todos lo datos son obligatorios',
                productos:[]
            };
        }
        
        if (!this.ValidarExitencia(data.id)) {
            return {
                description: 'El producto que desea actualizar no existe',
                productos:[]
            };
        }

        this.ServicesConnection.UpdateProduct(data).then(products => {
            if (products.status === Constants.CODE_200 && (products?.productos ?? []).length > 0) {
                Resultado = {
                    description: 'Producto actualizado',
                    productos:products?.productos ?? []
                };
            } else {

                Resultado = {
                    description: 'No se actualizaron productos',
                    productos: []
                };
            }
        }).catch(error => {
            console.error('Error updating product:', error);
            Resultado = {
                description: 'No se actualizaron productos',
                productos: []
            };
        });
        return Resultado;
    }

    public ElminarProducto(id:string):Result {
        let Resultado:Result = {description:'',productos:[]};

        if (!this.ValidarExitencia(id)) {
            return {
                description: 'El producto que desea eliminar no existe',
                productos:[]
            };
        }

        this.ServicesConnection.deleteProducts(id).then(product => {
            if (product.status === Constants.CODE_200) {
                Resultado = {
                    description: 'Producto eliminado',
                    productos:[]
                };
            } else {
                Resultado = {
                    description: 'No se elimino producto',
                    productos:[]
                };
            }
        }).catch(error => {
            console.error('Error deleting product:', error);
            Resultado = {
                description: 'No se elimino producto-hubo un error',
                productos:[]
            };
        });
        return Resultado;
    }

    public ValidarExitencia(id:string):boolean {
        let exists = false;
        this.ServicesConnection.ProductExists(id).then(product => {
            if(product.status === Constants.CODE_200)
            {
                exists = true;
            }else 
            {
                exists = false;
            }
            
        }).catch(error => {
            console.error('Error checking product existence:', error);
            exists = false;
        });
        return exists;
    }
}
