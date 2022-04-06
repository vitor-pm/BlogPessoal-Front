import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { Theme } from 'src/app/model/Theme';
import { AlertsService } from 'src/app/service/alerts.service';
import { PostsService } from 'src/app/service/posts.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  post: Post = new Post();

  theme: Theme = new Theme();
  themeList: Theme[];
  idTheme: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService,
    private themeService: ThemeService,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.alertService.showAlertInfo('Sua sessão expirou, por favor faça login novamente!');
      this.router.navigate(['/login']);
    }

    window.scroll(0, 0);

    let id = this.route.snapshot.params['id'];
    this.findByIdPost(id);
    this.getAllThemes();
  }

  findByIdPost(id: number) {
    this.postService.getPostById(id).subscribe((resp: Post) => {
      this.post = resp;
    });
  }

  findByIdTheme(id: number) {
    this.themeService.getThemeById(id).subscribe((resp: Theme) => {
      this.theme = resp;
    });
  }

  getAllThemes() {
    this.themeService.getAll().subscribe((resp: Theme[]) => {
      this.themeList = resp;
    });
  }

  update() {
    this.theme.id = this.idTheme;
    this.post.theme = this.theme;

    this.postService.putPost(this.post).subscribe((resp: Post) => {
      this.post = resp;
      this.alertService.showAlertSuccess('Postagem atualizada com sucesso!');
      this.router.navigate(['/home']);
    });
  }
}
