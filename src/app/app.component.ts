import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import {enableProdMode} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public auth: AuthService
    ){}

}
