import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {TokensType} from "../../../types/tokens.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tokens: TokensType = this.authService.getTokens();

    if (tokens && tokens.accessToken) {
      const cloneReq = req.clone({
        headers: req.headers.set('x-auth', tokens.accessToken),
      })
      return next.handle(cloneReq)
        .pipe(
          catchError((error) => {

            const errorMessage = (error.error.message || '').toLowerCase();

            if (error
              && ((error.status === 401
                  && !cloneReq.url.includes('/login')
                  && !cloneReq.url.includes('/refresh'))
                || (error.status === 500
                  && (errorMessage.includes('jwt expired')
                    || errorMessage.includes('ошибка авторизации')
                    || errorMessage.includes('jwt malformed')))
              )) {
              return this.intercept401Error(cloneReq, next);
            }
            return throwError(() => {
              return error;
            });
          })
        );
    }

    return next.handle(req);
  }


  intercept401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refresh()
      .pipe(
        switchMap((result: DefaultResponseType | LoginResponseType) => {
          let errorMessage: string = '';

          if ((result as DefaultResponseType) && (result as DefaultResponseType).error) {
            errorMessage = (result as DefaultResponseType).message;
          }

          const refreshResult = result as LoginResponseType;

          if (!refreshResult?.accessToken || !refreshResult.refreshToken || !refreshResult.userId) {
            errorMessage = 'Ошибка получения refresh токена'
          }

          if (errorMessage) {
            return throwError(() => new Error(errorMessage));
          }

          this.authService.setTokens(refreshResult.accessToken, refreshResult.refreshToken)

          const cloneReq = req.clone({
            headers: req.headers.set('x-auth', refreshResult.accessToken)
          })

          return next.handle(cloneReq)
        }),
        catchError(error => {
          this.authService.removeTokens();
          this.router.navigate(['/']);
          return throwError(() => new Error(error));
        })
      )
  }

}
