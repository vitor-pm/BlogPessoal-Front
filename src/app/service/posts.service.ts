import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('authorization', environment.token),
  };

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('authorization', environment.token),
    };
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/posts', this.token);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:8080/posts/${id}`, this.token);
  }

  postPost(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8080/posts', post, this.token);
  }

  putPost(post: Post):Observable<Post>{
    return this.http.put<Post>('http://localhost:8080/posts', post, this.token);
  }

  deletePost(id: number) {
    return this.http.delete(`http://localhost:8080/posts/${id}`, this.token);
  }

}
