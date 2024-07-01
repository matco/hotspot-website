import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import {User} from 'app/models/user';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
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
