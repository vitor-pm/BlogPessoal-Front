import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { Theme } from 'src/app/model/Theme';
import { PostsService } from 'src/app/service/posts.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {
  post: Post = new Post();

  idPost: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou, por favor faça login novamente!');
      this.router.navigate(['/login']);
    }

    window.scroll(0, 0);

    this.postService.refreshToken();

    this.idPost = this.route.snapshot.params['id'];
    this.findByIdPost(this.idPost);
  }

  findByIdPost(id: number) {
    this.postService.getPostById(this.idPost).subscribe((resp: Post) => {
      this.post = resp;
      console.log(this.post.theme);
    });
  }

  delete() {
    this.postService.deletePost(this.idPost).subscribe(() => {
      alert('Postagem deletada com sucesso!');
      this.router.navigate(['/home']);
    });
  }

}
