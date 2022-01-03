import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../services/app.service';

@Injectable()
export class TokenService {
	public static tokenStorageKey = 'token';
	constructor(private http: HttpClient) {
	}

	get(email: string, password: string) {
		return this.http
			.post<{[token: string]: string}>(`${AppService.API_URL}/tokens`, {email: email, password: password})
			.pipe(map((response: {[token: string]: string}) => {
				//login successful if there's a jwt token in the response
				//store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem(TokenService.tokenStorageKey, response['token']);
			}));
	}

	delete() {
		//remove user from local storage to log user out
		localStorage.removeItem(TokenService.tokenStorageKey);
	}
}
