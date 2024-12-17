import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AppComponent } from '../app/app.component';
import { MainComponent } from '../app/layout/main/main.component';
import { ServicesConnection } from '../app/data/services/api/servicesConection';
import { routes } from './app.routes';

@NgModule({
    declarations: [
        
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        AppComponent,
        MainComponent,
        CommonModule
    ],
    providers: [
        provideHttpClient(),
    ],
    bootstrap: []
})
export class AppModule { }