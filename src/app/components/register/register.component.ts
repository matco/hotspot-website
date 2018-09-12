import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';

import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	user: User = new User();
	loading = false;

	constructor(
		private router: Router,
		private userService: UserService,
		private alertService: AlertService) {}

	register() {
		this.loading = true;
		this.userService
			.create(this.user)
			.subscribe(
				data => {
					this.alertService.success('Registration successful', true);
					this.router.navigate(['/login']);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}
}
