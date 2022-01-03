import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { User } from '../models/user';
import { PasswordUpdate } from '../models/password-update';
import { AuthInterceptor } from 'app/auth.interceptor';

@Injectable()
export class MeService {
	constructor(private http: HttpClient) {}

	get(): Observable<User> {
		return this.http.get<User>(`${AppService.API_URL}/me`);
	}

	changePassword(passwordUpdate: PasswordUpdate): Observable<HttpResponse<string>> {
		const headers = new HttpHeaders().set(AuthInterceptor.HEADER_SKIP_ERROR_HANDLING, '');
		return this.http.post<HttpResponse<string>>(`${AppService.API_URL}/me/password`, passwordUpdate, {headers});
	}
}
