import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AlertService } from '../../services/alert.service';
import { TokenService } from '../../services/token.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	loading = false;

	loginForm = new FormGroup(
		{
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		}
	);

	constructor(
		private router: Router,
		private alertService: AlertService,
		private tokenService: TokenService) {}

	login() {
		this.loading = true;
		this.tokenService
			.get(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
			.subscribe({
				next: () => this.router.navigate(['/home', {reload: true}]),
				error: () => {
					this.alertService.error('Wrong login or password');
					this.loading = false;
				}
			});
	}

}
