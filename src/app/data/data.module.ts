import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesConnection } from './services/api/servicesConection';
import { DataService } from './services/dataService';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ServicesConnection,DataService]
})
export class DataModule {

  constructor() {
    console.log('DataModule loaded');
  }

  
  }
