import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { User } from '../../models/user';
import { PasswordUpdate } from '../../models/password-update';

import { MeService } from '../../services/me.service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

import { UserDeletionDialog } from '../../dialogs/user_deletion.dialog';

@Component({
	moduleId: module.id,
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, OnDestroy {

	user: User = new User();
	passwordUpdate: PasswordUpdate = new PasswordUpdate();
	subscription;
	loading = false;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private meService: MeService,
		private userService: UserService,
		private alertService: AlertService,
		private dialog: MatDialog) {}

	ngOnInit() {
		this.subscription = this.activatedRoute.params.subscribe(parameters => {
			if(parameters['handle']) {
				this.userService.get(parameters['handle']).subscribe(user => this.user = user);
			}
			else {
				this.alertService.error('No user specified');
				this.router.navigate(['/']);
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	saveDetails() {
		this.loading = true;
		this.userService
			.update(this.user)
			.subscribe(
				data => {
					this.alertService.success('Your profile has been updated successfully', true);
					this.router.navigate(['/']);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}

	changePassword() {
		this.loading = true;
		this.meService
			.changePassword(this.passwordUpdate)
			.subscribe(
				data => {
					this.alertService.success('Your password has been updated successfully', true);
					this.router.navigate(['/']);
				},
				error => {
					this.alertService.error(error);
					this.loading = false;
				});
	}

	deleteAccount() {
		this.dialog.open(UserDeletionDialog).afterClosed().subscribe(result => {
			if(result) {
				this.userService
					.delete(this.user.handle)
					.subscribe(
						data => {
							this.alertService.success('Your account has been deleted successfully', true);
							this.router.navigate(['/login']);
						},
						error => {
							this.alertService.error(error);
						});
			}
		});
	}
}
