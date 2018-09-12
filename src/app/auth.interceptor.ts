import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenService } from './services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private router: Router) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//enhance request with jwt token
		let enhanced_request;
		const token = localStorage.getItem(TokenService.tokenStorageKey);
		if(token) {
			enhanced_request = request.clone({headers: request.headers.set('Authorization', token)});
		}
		else {
			enhanced_request = request;
		}
		return next.handle(enhanced_request).pipe(
			map(response => response),
			catchError((response: HttpErrorResponse) => {
				switch(response.status) {
					case 0:
						this.router.navigate(['/network-error']);
						break;
					case 401:
						this.router.navigate(['/login']);
						break;
				}
				return throwError(response);
			})
		);
	}
}
