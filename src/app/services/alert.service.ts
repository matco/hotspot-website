import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'app/models/alert';

@Injectable()
export class AlertService {
	private subject = new Subject<Alert>();

	success(message: string) {
		this.subject.next(new Alert({type: 'success', message}));
	}

	error(message: string) {
		this.subject.next(new Alert({type: 'error', message}));
	}

	getAlerts(): Observable<any> {
		return this.subject.asObservable();
	}
}
