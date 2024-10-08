import {Component, OnInit} from '@angular/core';
import {NgIf, NgClass} from '@angular/common';

import {Alert} from '@models/alert';
import {AlertService} from '@services/alert.service';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css'],
	standalone: true,
	imports: [NgIf, NgClass]
})
export class AlertComponent implements OnInit {
	alert?: Alert;

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
