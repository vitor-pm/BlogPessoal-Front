import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  name = environment.name;
  picture = environment.picture;
  constructor(private route: Router) {}

  ngOnInit(): void {}

  logout() {
    environment.token = '';
    environment.name = '';
    environment.id = 0;
    environment.picture = '';
    this.route.navigate(['/login']);
    alert('Sessão encerrada');
  }
}
