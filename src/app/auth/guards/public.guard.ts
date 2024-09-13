import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService, private router: Router) { }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    console.log('Can Match', 'You are authenticated go to Heroes page');
    return this.checkAuthentication();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log('Can Activate', 'You are authenticated go to Heroes page')
    // console.log({ route, state });
    return this.checkAuthentication();
  }

  private checkAuthentication(): MaybeAsync<GuardResult> {
    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['./']);
          }
        }),
        map(isAuthenticated => !isAuthenticated)
      );
  }
}
