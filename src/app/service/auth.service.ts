import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      'http://localhost:8080/user/login',
      userLogin
    );
  }

  token = {
    headers: new HttpHeaders().set('authorization', environment.token),
  };

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('authorization', environment.token),
    };
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(environment.url + '/user/register', user);
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(environment.url + `/user/id/${id}`, this.token);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(environment.url + 'user/update', user, this.token);
  }

  logado() {
    let ok: boolean = false;
    if (environment.token != '') {
      ok = true;
    }
    return ok;
  }
}
