import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../services/app.service';
import { AlertService } from '../../services/alert.service';
import { TokenService } from '../../services/token.service';
import { MeService } from '../../services/me.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	model: any = {};
	loading = false;
	returnUrl: string;

	constructor(
		private router: Router,
		private appService: AppService,
		private alertService: AlertService,
		private tokenService: TokenService,
		private meService: MeService) {}

	login() {
		this.loading = true;
		this.tokenService
			.get(this.model.email, this.model.password)
			.subscribe(
				token => {
					this.router.navigate(['/home', {reload : true}]);
				},
				error => {
					this.alertService.error('Wrong login or password');
					this.loading = false;
				}
			);
	}

}
