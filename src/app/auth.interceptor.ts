import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenService } from './services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	public static HEADER_SKIP_ERROR_HANDLING = 'X-Interceptor-Skip-Error-Handling';

	constructor(private router: Router) {
	}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const flags = new Map<string, boolean>([
			[AuthInterceptor.HEADER_SKIP_ERROR_HANDLING, false]
		]);
		let enhanced_request;
		//retrieve flags if any
		if(request.headers.has(AuthInterceptor.HEADER_SKIP_ERROR_HANDLING)) {
			flags.set(AuthInterceptor.HEADER_SKIP_ERROR_HANDLING, true);
			const headers = request.headers.delete(AuthInterceptor.HEADER_SKIP_ERROR_HANDLING);
			enhanced_request = request.clone({headers});
		}
		//enhance request with jwt token
		const token = localStorage.getItem(TokenService.tokenStorageKey);
		if(token) {
			enhanced_request = request.clone({headers: request.headers.set('Authorization', token)});
		}
		else {
			enhanced_request = request;
		}
		const response_stream = next.handle(enhanced_request);
		//do not handle error if the the skip error flag has been set
		if(flags.get(AuthInterceptor.HEADER_SKIP_ERROR_HANDLING)) {
			return response_stream;
		}
		else {
			return response_stream.pipe(
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
}
