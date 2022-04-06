import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Theme } from 'src/app/model/Theme';
import { AlertsService } from 'src/app/service/alerts.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrls: ['./theme-delete.component.css'],
})
export class ThemeDeleteComponent implements OnInit {
  theme: Theme = new Theme();
  idTheme: number;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.alertService.showAlertInfo('Sua sessão expirou, faça o login novamente');
      this.router.navigate(['/login']);
    }

    this.idTheme = this.route.snapshot.params['id'];
    this.findByIdTheme(this.idTheme);
  }

  findByIdTheme(id: number) {
    this.themeService.getThemeById(id).subscribe((resp: Theme) => {
      this.theme = resp;
    });
  }

  deleteTheme() {
    this.themeService.deleteTheme(this.idTheme).subscribe(() => {
      this.alertService.showAlertInfo('Tema excluído.');
      this.router.navigate(['/theme']);
    });
  }
}
