import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { User } from '../models/user';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) {}

	get(handle: string): Observable<User> {
		return this.http.get<User>(AppService.API_URL + '/users/' + handle);
	}

	create(user: User): Observable<User> {
		return this.http.post<User>(AppService.API_URL + '/users', user);
	}

	update(handle: string, user: User) {
		return this.http.put(AppService.API_URL + '/users/' + handle, user);
	}

	delete(handle: string) {
		return this.http.delete(AppService.API_URL + '/users/' + handle);
	}
}
