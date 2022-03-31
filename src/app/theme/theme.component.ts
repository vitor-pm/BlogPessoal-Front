import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {
    // if (environment.token == '') {
    //   alert('Sua sessão expirou, faça o login novamente');
    //   this.route.navigate(['/login']);
    // }
  }
}
