import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../models/user';

import { MeService } from '../../services/me.service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

import { UserDeletionDialog } from '../../dialogs/user_deletion.dialog';
import { matchingPasswords } from '../../directives/matching-passwords';

@Component({
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

	user?: User;
	subscription? : Subscription;
	loading = false;

	userForm = new FormGroup(
		{
			firstname: new FormControl('', [Validators.required]),
			lastname: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email])
		}
	);

	passwordForm = new FormGroup(
		{
			currentPassword: new FormControl('', [Validators.required]),
			newPassword: new FormControl('', [Validators.required]),
			confirmPassword: new FormControl('', [Validators.required])
		},
		{
			validators: matchingPasswords
		}
	);

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
				this.userService.get(parameters['handle']).subscribe(user => {
					this.user = user;
					this.userForm.patchValue(user);
				});
			}
			else {
				this.alertService.error('No user specified');
				this.router.navigate(['/']);
			}
		});
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe();
	}

	saveDetails() {
		if(this.user) {
			this.loading = true;
			const user = this.userForm.value;
			this.userService
				.update(this.user.handle, user)
				.subscribe({
					next: () => {
						this.alertService.success('Your profile has been updated successfully');
						this.router.navigate(['/']);
					},
					error: error => {
						this.alertService.error(error);
						this.loading = false;
					}
				});
		}
	}

	changePassword() {
		this.loading = true;
		const passwordUpdate = {
			currentPassword: this.passwordForm.controls['currentPassword'].value,
			newPassword: this.passwordForm.controls['newPassword'].value,
		};
		this.meService
			.changePassword(passwordUpdate)
			.subscribe({
				next: () => {
					this.alertService.success('Your password has been updated successfully');
					this.router.navigate(['/']);
				},
				error: error => {
					if(error.status === 401) {
						this.alertService.error('Current password is invalid');
					}
					else {
						this.alertService.error('Unknown error');
					}
					this.loading = false;
				}
			});
	}

	deleteAccount() {
		this.dialog.open(UserDeletionDialog).afterClosed().subscribe(result => {
			if(result && this.user) {
				this.userService
					.delete(this.user.handle)
					.subscribe({
						next: () => {
							this.alertService.success('Your account has been deleted successfully');
							this.router.navigate(['/login']);
						},
						error: error => {
							this.alertService.error(error);
						}
					});
			}
		});
	}
}
