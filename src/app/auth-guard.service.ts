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
        console.log('AuthGuardService: CanLoad ' + segments);
        return this.authService.isAuthenticated().pipe(take(1), switchMap(isAuthenticated => {
            console.log('AuthGuardService: ' + isAuthenticated);
            if (!isAuthenticated) {
                // try re-log in
                return this.authService.reLogIn().pipe(switchMap(isReLoginSuccessful => {
                    console.log('AuthGuardService ReLogin: ' + isReLoginSuccessful);
                    if (isReLoginSuccessful) {
                        // if re-log in successfully
                        this.router.navigateByUrl('/devices');
                        return of (true);
                    } else {
                        // if failed to re-login
                        const b = segments && segments.length > 0;
                        console.log('AuthGuardService ReLogin: ' + b);
                        if (b) {
                            const path = segments[0].path;
                            console.log(path);
                            if (path !== 'login') {
                                console.log('abc');
                                this.router.navigateByUrl('/login');
                                return of (false);
                            } else {
                                return of (true);
                            }
                        }
                    }
                }), tap(isReLoginSuccessful => {

                }));
            } else {
                return of(isAuthenticated);
            }
        }));
    }
}
