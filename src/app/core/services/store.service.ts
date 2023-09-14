import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _loggedUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor () {
    this.setLoggedUser({
      email: 'pippo@pluto.com',
      gender: 'female',
      name: 'Harry Potter',
      status: 'inactive',
      id: 5151479
    })
  }

  /**
   * Current logged user
   */
  public get loggedUser$(): Observable<User | null> {
    return this._loggedUser$.asObservable();
  }

  /**
   * Set logged user
   * @param user user data, set to null to log off
   */
  public setLoggedUser(user: User | null) {
    this._loggedUser$.next(user);
  }
}
