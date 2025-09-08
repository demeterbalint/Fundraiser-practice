import {
  CanActivate,
  Router,
} from '@angular/router';
import {AccountService} from '../services/account.service';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.accountService.hasAccount().pipe(
      map(account => {
        if (account) {
          return true;
        } else {
          this.router.navigate(['/registration']);
          return false;
        }
      }),
      catchError(() => { // backend error (like 404)
        this.router.navigate(['/registration']);
        return of(false);
      })
    )}
}
