import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../data/interfaces/Producto';
import { DateFormatPipe } from "../../pipes/date-format.pipe";

@Component({
  imports: [CommonModule, DateFormatPipe],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() productos: Producto[] = [];
  paginaActual : number = 1;
  itemsPorPagina: number = 5;
  totalItems: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.totalItems = this.productos.length;
  }

  get productosPaginados() {
    let startIndex = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.productos.slice(startIndex, startIndex + this.itemsPorPagina);
  }

  cambioPagina(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.paginaActual = page;
    }
  }

  public cambioItemsPorPagina(event: Event) {
    let selectElement = event.target as HTMLSelectElement;
    this.itemsPorPagina = +selectElement.value;
    this.paginaActual = 1; 
  }

  public totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPorPagina);
  }
}