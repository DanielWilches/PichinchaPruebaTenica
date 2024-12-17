import { HeaderComponent } from "./layout/header/header.component";
import { MainComponent } from "./layout/main/main.component";
import { FooterComponent } from "./layout/footer/footer.component";

import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PichinchaPruebaTecnica';
}
