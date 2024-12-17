import { ProductsService } from '../../data/services/api/products.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Producto } from '../../data/interfaces/Producto';
import { TableComponent } from "../table/table.component";
import { Constants } from '../../data/constants/constants';
import { LoggerService } from '../../data/services/api/logger.service';
import { Result } from '../../data/interfaces/Result';



@Component({
  selector: 'app-main',
  imports: [TableComponent,CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent implements OnInit {
  ProductsService: ProductsService;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  logger: LoggerService;
  loading: boolean = true;

  constructor(ProductsService: ProductsService, logger: LoggerService) {
    this.ProductsService = ProductsService;
    this.logger = logger;

  }

  ngOnInit(): void {
    this.obtenerProductos();
  }
  public obtenerProductos(): void {

    this.ProductsService.GetProducts()
      .then((response: Result) => {
        if (response.status === Constants.CODE_200) {
          this.productos = response?.productos ?? [];
          this.productosFiltrados = response?.productos ?? [];
          this.logger.log(new Date().toISOString(), this.constructor.name, this.logger.ObtenerMetodo(), response?.description ?? "");
        } else {
          this.productos = [];
          this.productosFiltrados = [];
          this.logger.warn(new Date().toISOString(), this.constructor.name, this.logger.ObtenerMetodo(), response.description);
        }
        this.loading = false;
      },
        (error) => {
          console.error('Error al cargar productos', error);
          this.loading = false;
        }



      ).catch((error) => {
        this.logger.error(new Date().toISOString(), this.constructor.name, this.logger.ObtenerMetodo(), error);
      });

  }

  public filtrarProductos(event: Event): void {
    let inputElement = event.target as HTMLInputElement;
    let busqueda = inputElement.value.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto =>
      producto.name.toLowerCase().includes(busqueda) ||
      producto.description.toLowerCase().includes(busqueda)
    );
  }

}
