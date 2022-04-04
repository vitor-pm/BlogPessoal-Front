import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/model/Theme';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css'],
})
export class ThemeEditComponent implements OnInit {
  theme: Theme = new Theme();

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente');
      this.router.navigate(['/login']);
    }

    let id = this.route.snapshot.params['id'];
    this.findByIdTheme(id);
  }

  findByIdTheme(id: number) {
    this.themeService.getThemeById(id).subscribe((resp: Theme) => {
      this.theme = resp;
    });
  }

  update() {
    this.themeService.putTheme(this.theme).subscribe((resp: Theme) => {
      this.theme = resp;
      alert('Tema atualizado.');
      this.router.navigate(['/theme']);
    });
  }
}
