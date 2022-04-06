import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();
  constructor(
    private auth: AuthService,
    private route: Router,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  login() {
    this.auth.login(this.userLogin).subscribe({
      next: (resp: UserLogin) => {
        this.userLogin = resp;

        environment.token = this.userLogin.token;
        environment.name = this.userLogin.name;
        environment.picture = this.userLogin.picture;
        environment.id = this.userLogin.id;

        this.route.navigate(['/home']);
      },
      error: (erro) => {
        if (erro.status == 404 || erro.status == 401) {
          this.alertService.showAlertDanger('Usuário ou senha inválidos.');
        }
      },
    });
  }
}
