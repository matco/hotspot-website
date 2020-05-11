import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Stash } from '../../models/stash';

import { StashService } from '../../services/stash.service';
import { AlertService } from '../../services/alert.service';

@Component({
	moduleId: module.id,
	templateUrl: './stash.component.html'
})

export class StashComponent implements OnInit, OnDestroy {
	subscription;
	loading = false;

	stash: Stash;
	stashForm = new FormGroup(
		{
			name: new FormControl('', [Validators.required]),
			description: new FormControl(),
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
		this.subscription.unsubscribe();
	}

	save() {
		this.loading = true;
		const okCallback = data => {
			this.loading = false;
			this.alertService.success('Stash saved successfully', true);
			this.router.navigate(['/home']);
		};
		const errorCallback = error => {
			this.loading = false;
			this.alertService.error(error);
		};
		if(this.stash) {
			this.stashService.save(this.stash.uuid, this.stashForm.value).subscribe(okCallback, errorCallback);
		}
		else {
			this.stashService.create(this.stashForm.value).subscribe(okCallback, errorCallback);
		}
	}
}
