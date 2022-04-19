import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Comments } from '../model/Comments';
import { Post } from '../model/Post';
import { Theme } from '../model/Theme';
import { User } from '../model/User';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';
import { CommentsService } from '../service/comments.service';
import { PostsService } from '../service/posts.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  post: Post = new Post();
  posts: Post[];

  themeList: Theme[];
  theme: Theme = new Theme();
  idTheme: number;

  user: User = new User();
  idUser = environment.id;

  commentText: string;
  commented: Comments = new Comments();

  key = 'data'
  reverse = true

  constructor(
    private route: Router,
    private postService: PostsService,
    private themeService: ThemeService,
    private authService: AuthService,
    private alerstService: AlertsService,
    private commentsService: CommentsService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.alerstService.showAlertInfo(
        'Sua sessão expirou, faça o login novamente'
      );
      this.route.navigate(['/login']);
    }

    this.themeService.refreshToken();
    this.authService.refreshToken();
    this.postService.refreshToken();
    this.getAllThemes();
    this.getAllPosts();
  }

  getAllThemes() {
    this.themeService.getAll().subscribe((resp: Theme[]) => {
      this.themeList = resp;
    });
  }

  findByIdTheme() {
    this.themeService.getThemeById(this.idTheme).subscribe((resp: Theme) => {
      this.theme = resp;
    });
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe((resp: Post[]) => {
      this.posts = resp;
    });
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp;
    });
  }

  textComment(event: any) {
    this.commentText = event.target.value;
  }

  comment(id: number) {
    let txt = <HTMLInputElement>document.querySelector('#comment' + id);

    if (txt.value == '') {
      txt.placeholder = 'Digite um comentário!';
      txt.style.borderColor = 'red';
    } else {
      this.commented.comment = txt.value;

      this.post.id = id;
      this.commented.post = this.post;

      this.user.id = this.idUser;
      this.commented.user = this.user;

      console.log(this.commented);

      this.commentsService
        .comment(this.commented)
        .subscribe((resp: Comments) => {
          this.commented = resp;
          this.alerstService.showAlertSuccess(
            'Comentário enviado com sucesso!'
          );
          this.commented = new Comments();
        });

      this.getAllPosts(); // Atualiza a lista de posts
    }
  }

  publish() {
    this.theme.id = this.idTheme;
    this.post.theme = this.theme;

    this.user.id = this.idUser;
    this.post.creator = this.user;

    this.postService.postPost(this.post).subscribe((resp: Post) => {
      this.post = resp;
      this.alerstService.showAlertSuccess('Postagem realizada com sucesso!');

      this.getAllPosts(); // Atualiza a lista de posts

      this.post = new Post();
    });
  }
}
