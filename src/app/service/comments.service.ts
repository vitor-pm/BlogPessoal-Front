import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comments } from '../model/Comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('authorization', environment.token),
  };

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('authorization', environment.token),
    };
  }

  comment(comment: Comments): Observable<Comments> {
    this.refreshToken();
    return this.http.post<Comments>('http://localhost:8080/comments/post', comment, this.token);
  }

}
