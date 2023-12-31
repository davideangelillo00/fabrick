import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _loggedUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private _loader$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /**
   * Current logged user
   */
  public get loggedUser$(): Observable<User | null> {
    return this._loggedUser$.asObservable();
  }

  /**
   * Loader status, must be > 0 to be visible
   */
  public get loader$(): Observable<number> {
    return this._loader$.asObservable();
  }

  /**
   * Set logged user
   * @param user user data, set to null to Logout
   */
  public setLoggedUser(user: User | null) {
    this._loggedUser$.next(user);
  }

  /**
   * Increments the loader counter
   */
  public showLoader(): void {
    this._loader$.next(this._loader$.value + 1);
  }

  /**
   * Decrements the loader counter (cannot be < 0)
   */
  public hideLoader(): void {
    if (this._loader$.value > 0) {
      this._loader$.next(this._loader$.value - 1);
    }
  }
}
