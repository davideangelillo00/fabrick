import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public findUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.serverEndpoint}/public/v2/users/${id}`);
  }

  public registerUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${environment.serverEndpoint}/public/v2/users/`, user)
  }

}
