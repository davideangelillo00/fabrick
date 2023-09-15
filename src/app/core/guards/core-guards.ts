import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { StoreService } from '../services/store.service';
import { User } from 'src/app/shared/interfaces/user';
import { RoutesEnum } from '../enums/routes.enum';

export const authGuard = () => {
  const router = inject(Router)
  const service = inject(StoreService);
  return service.loggedUser$.pipe(
    map((user: User | null) => Boolean(user)),
    tap((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigate([RoutesEnum.HOME]);
      }
    })
  );
};
