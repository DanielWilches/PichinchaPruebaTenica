import { LoggerService } from './logger.service';
import { Producto } from '../../interfaces/Producto';
import { Constants } from '../../constants/constants';
import { Response } from '../../interfaces/Response';

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Result } from '../../interfaces/Result';
import { Data } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  logger: LoggerService;

  constructor(logger: LoggerService, private http: HttpClient) {
    this.logger = logger;

  }
  public async GetProducts(): Promise<Result> {
    let URL = `${Constants.URL_BASE}${Constants.BP_PRODUCTS}`;
    try {
      return new Promise((resolve, reject) => {
        this.http.get<Response>(URL, {
          observe: 'response',
          headers: {
            'Content-Type': Constants.CONTENT_TYPE_JSON,
            'authorId': Constants.AUTHOR_ID
          }
        }).subscribe((response: HttpResponse<Response>) => {
          let productos:Data = response.body ?? [];
          if (response.status === 200) {
            this.logger.log(new Date().toISOString(), this.constructor.name, this.logger.ObtenerMetodo(), response.body);
            resolve({
              status: response.status ?? Constants.CODE_200,
              description: Constants.DESCRIPCION_EXITOSA,
              productos: productos?.['data'],
              error: response.statusText
            });
          } else {
            this.logger.warn(new Date().toISOString(), this.constructor.name, this.logger.ObtenerMetodo(), response.body);
            resolve({
              status: response.status ?? Constants.CODE_400,
              description: `${Constants.DESCRIPCION_FALLIDA}-${response.statusText ?? ""}`,
              productos: productos?.['data'],
              error: Constants.ERROR
            });
          }
        }, (error) => {
          this.logger.error(new Date().toISOString(), this.constructor.name, this.logger.ObtenerMetodo(), error);
          reject({
            status: error.status ?? Constants.CODE_400,
            description: `${Constants.DESCRIPCION_FALLIDA} -${error.message ?? ""}`,
            error: Constants.ERROR,
            productos: []
          });
        });
      });
    } catch (error) {
      this.logger.error(new Date().toISOString(), this.constructor.name, this.logger.ObtenerMetodo(), error);
      return {
        status: Constants.CODE_400,
        description: `${Constants.DESCRIPCION_FALLIDA}`,
        error: Constants.ERROR,
        productos: []

      };
    }
  }

  //public async CreateProduct(data: Producto): Promise<Response> {
  //  let URL = `${Constants.URL_BASE}${Constants.BP_PRODUCTS}`;
  //  try {
//
  //    let response: any = await this.http.post(URL, data, {
  //      headers: {
  //        'Content-Type': Constants.CONTENT_TYPE_JSON,
  //        'authorId': Constants.AUTHOR_ID
  //      }
  //    }).toPromise();
  //    if (response.status === 200) {
  //      return response;
  //    } else {
  //      return {
  //        status: response?.status ?? Constants.CODE_400,
  //        description: `${Constants.DESCRIPCION_FALLIDA}-AL CREAR PRODUCTOS`,
  //        error: Constants.ERROR,
  //        productos: []
  //      };
  //    }
  //  } catch (error) {
  //    return {
  //      status: Constants.CODE_404,
  //      description: `${Constants.DESCRIPCION_FALLIDA}-${error}`,
  //      error: Constants.FAILED,
  //      productos: []
  //    };
  //  }
  //}
//
  //public async UpdateProduct(data: Producto): Promise<Response> {
  //  try {
  //    let url = `${Constants.URL_BASE}${Constants.BP_PRODUCTS}`;
  //    let response: any = await this.http.put(url, data, {
  //      headers: {
  //        'Content-Type': Constants.CONTENT_TYPE_JSON,
  //        'authorId': '1234567890DEVTECNICA'
  //      }
  //    }).toPromise();
  //    if (response.status === 200) {
  //      return response;
  //    } else {
  //      return {
  //        status: response?.status ?? Constants.CODE_400,
  //        description: `$${Constants.DESCRIPCION_FALLIDA}-${response?.description ?? ""}`,
  //        error: Constants.ERROR,
  //      };
  //    }
  //  } catch (error) {
  //    return {
  //      status: Constants.CODE_404,
  //      description: `${Constants.DESCRIPCION_FALLIDA}-${error}-AL ACTUALIZAR PRODUCTOS`,
  //      error: Constants.FAILED,
  //    };
  //  }
  //}
//
  //public async deleteProducts(id: string): Promise<Response> {
  //  try {
  //    let url = `${Constants.URL_BASE}${Constants.BP_PRODUCTS}?id=${id}`;
  //    let response: any = await this.http.delete(url, {
  //      headers: {
  //        'Content-Type': Constants.CONTENT_TYPE_JSON,
  //        'authorId': '1234567890DEVTECNICA'
  //      }
  //    }).toPromise();
  //    if (response.status === 200) {
  //      return response;
  //    } else {
  //      return {
  //        status: response?.status ?? Constants.CODE_400,
  //        description: `${Constants.DESCRIPCION_FALLIDA}-${response?.description ?? ""}`,
  //        error: "FAILED",
  //      };
  //    }
  //  } catch (error) {
  //    return {
  //      status: Constants.CODE_404,
  //      description: `${Constants.DESCRIPCION_FALLIDA}-${error}-AL ACTUALIZAR PRODUCTOS`,
  //      error: Constants.FAILED,
  //    };
  //  }
  //}
//
  //public async ProductExists(id: string): Promise<Response> {
  //  try {
  //    let url = `${Constants.URL_BASE}${Constants.BP_PRODUCTS_VERIFICATION}?id=${id}`;
  //    let response: any = await this.http.get(url, {
  //      headers: {
  //        'Content-Type': Constants.CONTENT_TYPE_JSON,
  //        'authorId': '1234567890DEVTECNICA'
  //      }
  //    }).toPromise();
  //    if (response.status === 200) {
  //      return response;
  //    } else {
  //      return {
  //        status: Constants.CODE_400,
  //        description: `${Constants.DESCRIPCION_FALLIDA}-${response?.description ?? ""}`,
  //        error: Constants.ERROR,
  //      };
  //    }
  //  } catch (error) {
  //    return {
  //      status: Constants.CODE_400,
  //      description: `${Constants.DESCRIPCION_FALLIDA}-${error}-al verificar producto`,
  //      error: Constants.FAILED,
  //    };
  //  }
  //}

}
