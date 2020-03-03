import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

    constructor(private authService: AuthService, private router: Router) {
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().pipe(take(1), switchMap(isAuthenticated => {
            if (!isAuthenticated) {
                // try re-log in
                return this.authService.reLogIn();
            } else {
                return of(isAuthenticated);
            }
        }), tap(isAuthenticated => {
            if (!isAuthenticated) {
                this.router.navigateByUrl('/login');
            }
        }));
    }
}
