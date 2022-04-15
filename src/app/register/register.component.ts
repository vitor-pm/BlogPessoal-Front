import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  confPassword: string;
  tyUser: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmPassword(event: any) {
    this.confPassword = event.target.value;
  }

  typeUser(event: any) {
    this.tyUser = event.target.value;
  }



  register() {
    this.user.role = this.tyUser;
    console.log(this.user);
    if (this.user.password != this.confPassword) {
      this.alertService.showAlertDanger('As senhas não coincidem.');
    } else {
      this.authService.register(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.router.navigate(['/login']);
        this.alertService.showAlertSuccess('Usuário cadastrado com sucesso!');
      });
    }
  }
}
