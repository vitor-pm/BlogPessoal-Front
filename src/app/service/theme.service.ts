import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../model/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('authorization', environment.token),
  };

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('authorization', environment.token),
    };
  }

  getAll(): Observable<Theme[]> {
    return this.http.get<Theme[]>(environment.url + '/theme/all', this.token );
  }

  getThemeById(id: number): Observable<Theme>{
    return this.http.get<Theme>(environment.url + `/theme/${id}`, this.token );
  }

  postTheme(theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(environment.url + '/theme', theme , this.token);
  }

  putTheme(theme: Theme): Observable<Theme> {
    return this.http.put<Theme>(environment.url + '/theme', theme ,this.token);
  }

  deleteTheme(id: number) {
    return this.http.delete(environment.url + `/theme/${id}`, this.token);
  }
}
