import {Subscription} from 'rxjs';

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

import {MatFormField, MatError} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatAnchor, MatButton} from '@angular/material/button';

import {Stash} from '@models/stash';

import {StashService} from '@services/stash.service';
import {AlertService} from '@services/alert.service';

@Component({
	templateUrl: './stash.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormField, MatInput, NgIf, MatError, MatAnchor, RouterLink, MatButton]
})
export class StashComponent implements OnInit, OnDestroy {
	subscription?: Subscription;
	loading = false;

	stash?: Stash;
	stashForm = new FormGroup(
		{
			name: new FormControl('', {validators: Validators.required, nonNullable: true}),
			description: new FormControl(''),
		}
	);

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private alertService: AlertService,
		private stashService: StashService) {}

	ngOnInit() {
		this.subscription = this.activatedRoute.params.subscribe(parameters => {
			if(parameters['uuid']) {
				this.stashService.get(parameters['uuid']).subscribe(stash => {
					this.stash = stash;
					this.stashForm.patchValue(stash);
				});
			}
		});
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe();
	}

	save() {
		this.loading = true;
		const okCallback = () => {
			this.loading = false;
			this.alertService.success('Stash saved successfully');
			this.router.navigate(['/home']);
		};
		const errorCallback = (response: HttpErrorResponse) => {
			this.loading = false;
			this.alertService.error(response.error.message);
		};
		if(this.stash) {
			this.stashService.save(this.stash.uuid, this.stashForm.value as Stash).subscribe({next: okCallback, error: errorCallback});
		}
		else {
			this.stashService.create(this.stashForm.value as Stash).subscribe({next: okCallback, error: errorCallback});
		}
	}
}
