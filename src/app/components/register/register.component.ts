import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

import {MatFormField, MatError} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatAnchor, MatButton} from '@angular/material/button';

import {User} from '@models/user';

import {UserService} from '@services/user.service';
import {AlertService} from '@services/alert.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	standalone: true,
	imports: [ReactiveFormsModule, MatFormField, MatInput, NgIf, MatError, MatAnchor, RouterLink, MatButton]
})
export class RegisterComponent {
	loading = false;

	registerForm = new FormGroup(
		{
			name: new FormControl('', {validators: Validators.required, nonNullable: true}),
			email: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
			password: new FormControl('', {validators: Validators.required, nonNullable: true})
		}
	);

	constructor(
		private router: Router,
		private userService: UserService,
		private alertService: AlertService) {}

	register() {
		this.loading = true;
		this.userService
			.create(this.registerForm.value as User)
			.subscribe({
				next: () => {
					this.alertService.success('Registration successful');
					this.router.navigate(['/login']);
				},
				error: response => {
					this.alertService.error(response.error.message);
					this.loading = false;
				}
			});
	}
}
