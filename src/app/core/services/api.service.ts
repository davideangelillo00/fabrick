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

  /**
   * Finds user by *id*
   * @param id The *id* of the user
   * @returns The user found for the given *id*
   */
  public findUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.serverEndpoint}/public/v2/users/${id}`);
  }

  /**
   * Registers a user
   * @param user User to register
   * @returns The registered user, with its newly generated *id*
   */
  public registerUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${environment.serverEndpoint}/public/v2/users/`, user)
  }

  /**
   * Updates a user
   * @param user User info to update. Key *id* is **required**
   * @returns The updated user
   */
  public updateUser(user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.serverEndpoint}/public/v2/users/${user.id}`, user);
  }

}
