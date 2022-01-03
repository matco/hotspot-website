import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'app/models/alert';

@Injectable()
export class AlertService {
	private subject = new Subject<Alert>();

	success(message: string) {
		this.subject.next(new Alert('success', message));
	}

	error(message: string) {
		this.subject.next(new Alert('error', message));
	}

	getAlerts(): Observable<Alert> {
		return this.subject.asObservable();
	}
}
