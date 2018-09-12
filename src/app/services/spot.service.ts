import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { Spot } from '../models/spot';

@Injectable()
export class SpotService {

	constructor(private http: HttpClient) {}

	all(): Observable<Spot[]> {
		return this.http.get<Spot[]>(AppService.API_URL + '/spots');
	}

	create(spot: Spot): Observable<Spot> {
		return this.http.post<Spot>(AppService.API_URL + '/spots', spot);
	}

	get(uuid: string): Observable<Spot> {
		return this.http.get<Spot>(AppService.API_URL + '/spots/' + uuid);
	}

	save(spot: Spot) {
		return this.http.put(AppService.API_URL + '/spots/' + spot.uuid, spot);
	}

	delete(uuid: string) {
		return this.http.delete(AppService.API_URL + '/spots/' + uuid);
	}
}
