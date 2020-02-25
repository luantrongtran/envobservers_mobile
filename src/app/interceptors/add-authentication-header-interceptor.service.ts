import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {mergeMap, switchMap, take} from 'rxjs/operators';

// import {UserInfo} from '../models/UserInfo';

@Injectable()
export class AddAuthenticationHeaderInterceptorService implements HttpInterceptor {


    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.getUserInfo().pipe(take(1), mergeMap(userInfo => {
            if (userInfo != null) {
                const newReq = req.clone({
                    setHeaders: {
                        token: userInfo.token
                    }
                });

                return next.handle(newReq);
            }

            console.log(req.headers);

            return next.handle(req.clone());

        }));
    }
}
