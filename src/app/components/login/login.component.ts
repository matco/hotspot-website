import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatError} from '@angular/material/form-field';

import {AlertService} from '@services/alert.service';
import {TokenService} from '@services/token.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	standalone: true,
	imports: [ReactiveFormsModule, MatFormField, MatInput, NgIf, MatError, MatButton, RouterLink]
})
export class LoginComponent {
	loading = false;

	loginForm = new FormGroup(
		{
			email: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
			password: new FormControl('', {validators: Validators.required, nonNullable: true})
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
