import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { Stash } from '../models/stash';
import { Spot } from '../models/spot';

@Injectable()
export class StashService {

	constructor(private http: HttpClient) { }

	all(): Observable<Stash[]> {
		return this.http.get<Stash[]>(AppService.API_URL + '/stashs');
	}

	create(stash: Stash): Observable<Stash> {
		return this.http.post<Stash>(AppService.API_URL + '/stashs', stash);
	}

	get(uuid: string): Observable<Stash> {
		return this.http.get<Stash>(AppService.API_URL + '/stashs/' + uuid);
	}

	save(stash: Stash) {
		return this.http.put(AppService.API_URL + '/stashs/' + stash.uuid, stash);
	}

	delete(uuid: string) {
		return this.http.delete(AppService.API_URL + '/stashs/' + uuid);
	}

	getSpots(uuid: string): Observable<Spot[]> {
		return this.http.get<Spot[]>(AppService.API_URL + '/stashs/' + uuid + '/spots');
	}

	addToStash(stashUuid: string, spotUuid: string) {
		return this.http.post(AppService.API_URL + '/stashs/' + stashUuid + '/spots/' + spotUuid, undefined);
	}

	removeFromStash(stashUuid: string, spotUuid: string) {
		return this.http.delete(AppService.API_URL + '/stashs/' + stashUuid + '/spots/' + spotUuid);
	}
}
