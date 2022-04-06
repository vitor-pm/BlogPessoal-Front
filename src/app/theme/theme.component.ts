import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';
import { AlertsService } from '../service/alerts.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent implements OnInit {
  constructor(
    private route: Router,
    private themeService: ThemeService,
    private alertService: AlertsService
  ) {}

  theme: Theme = new Theme();
  themeList: Theme[];

  ngOnInit() {
    if (environment.token == '') {
      this.alertService.showAlertInfo('Sua sessão expirou, faça o login novamente');
      this.route.navigate(['/login']);
    }

    this.themeService.refreshToken();
    this.findAll();
  }

  registerTheme() {
    this.themeService.postTheme(this.theme).subscribe((resp: Theme) => {
      this.theme = resp;
      this.alertService.showAlertSuccess('Tema cadastrado com sucesso.');
      this.findAll();
      this.theme = new Theme();
    });
  }

  findAll() {
    this.themeService.getAll().subscribe((resp: Theme[]) => {
      this.themeList = resp;
    });
  }
}
