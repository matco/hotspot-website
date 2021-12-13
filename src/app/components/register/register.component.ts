import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	loading = false;

	registerForm = new FormGroup(
		{
			firstname: new FormControl('', [Validators.required]),
			lastname: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		}
	);

	constructor(
		private router: Router,
		private userService: UserService,
		private alertService: AlertService) {}

	register() {
		this.loading = true;
		this.userService
			.create(this.registerForm.value)
			.subscribe(
				data => {
					this.alertService.success('Registration successful');
					this.router.navigate(['/login']);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}
}
