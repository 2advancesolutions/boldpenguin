import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // All HTTP requests are going to go through this method
        const authReq = req.clone({
            headers: new HttpHeaders({
                Authorization: 'Bearer e60ce72ecdebc37631b0cc1de13a2f15',
                'Content-Type': 'application/json',
            })
        });
        console.log('Intercepted HTTP call', authReq);
        return next.handle(authReq);
    }
}
