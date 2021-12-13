import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert.service';

@Component({
	moduleId: module.id,
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit {
	alert: any;

	constructor(private alertService: AlertService) {}

	ngOnInit() {
		this.alertService.getAlerts().subscribe(alert => {
			this.alert = alert;
			setTimeout(() => this.close(), 3000);
		});
	}

	close() {
		this.alert = undefined;
	}
}
