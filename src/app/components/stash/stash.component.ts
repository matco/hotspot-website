import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Stash } from '../../models/stash';

import { StashService } from '../../services/stash.service';
import { AlertService } from '../../services/alert.service';

@Component({
	moduleId: module.id,
	templateUrl: './stash.component.html'
})

export class StashComponent implements OnInit, OnDestroy {
	stash: Stash = new Stash();
	subscription;
	loading = false;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private alertService: AlertService,
		private stashService: StashService) {}

	ngOnInit() {
		this.subscription = this.activatedRoute.params.subscribe(parameters => {
			if(parameters['uuid']) {
				this.stashService.get(parameters['uuid']).subscribe(stash => this.stash = stash);
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
		if(this.stash.uuid) {
			this.stashService.save(this.stash).subscribe(okCallback, errorCallback);
		}
		else {
			this.stashService.create(this.stash).subscribe(okCallback, errorCallback);
		}
	}
}
