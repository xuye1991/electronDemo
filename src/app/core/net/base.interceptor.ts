import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators';
// import { environment } from '@env/environment.prod';
import {environment} from '@env/environment';

/*设置请求的基地址，方便替换*/
const baseurl = environment.SERVER_URL;

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

    constructor() { }
    intercept(req, next: HttpHandler) {
        
        let newReq = req.clone({
            url: req.hadBaseurl ? `${req.url}` : `${baseurl}${req.url}`,
        });

        // send cloned request with header to the next handler.
        return next.handle(newReq)
            .pipe(
                /*失败时重试2次，可自由设置*/
                retry(2),
                /*捕获响应错误，可根据需要自行改写，我偷懒了，直接用的官方的*/
                catchError(this.handleError)
            )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}