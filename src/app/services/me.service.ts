import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { User } from '../models/user';
import { PasswordUpdate } from '../models/password-update';

@Injectable()
export class MeService {
	constructor(private http: HttpClient) {}

	get(): Observable<User> {
		return this.http.get<User>(AppService.API_URL + '/me');
	}

	changePassword(passwordUpdate: PasswordUpdate): Observable<HttpResponse<string>> {
		const update = Object.assign({}, passwordUpdate);
		delete update.repeatPassword;
		return this.http.post<HttpResponse<string>>(AppService.API_URL + '/me/password', update);
	}
}
