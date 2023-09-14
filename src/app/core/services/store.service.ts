import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _loggedUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public get loggedUser$(): Observable<User | null> {
    return this._loggedUser$.asObservable();
  }

  public setLoggedUser(user: User | null) {
    this._loggedUser$.next(user);
  }
}