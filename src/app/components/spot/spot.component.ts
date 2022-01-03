import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Stash } from '../../models/stash';
import { Spot } from '../../models/spot';

import { SpotService } from '../../services/spot.service';
import { StashService } from '../../services/stash.service';
import { AlertService } from '../../services/alert.service';

@Component({
	templateUrl: './spot.component.html'
})
export class SpotComponent implements OnInit, OnDestroy {
	subscription;
	loading = false;
	positionWatcher;

	stash: Stash;
	spot: Spot;
	spotForm = new FormGroup(
		{
			name: new FormControl('', [Validators.required]),
			latitude: new FormControl('', [Validators.required]),
			longitude: new FormControl('', [Validators.required]),
			description: new FormControl(),
		}
	);

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private alertService: AlertService,
		private spotService: SpotService,
		private stashService: StashService) {}

	ngOnInit() {
		this.subscription = this.activatedRoute.params.subscribe(parameters => {
			if(parameters['stash']) {
				this.stashService.get(parameters['stash']).subscribe(stash => this.stash = stash);
			}
			if(parameters['uuid']) {
				this.spotService.get(parameters['uuid']).subscribe(spot => {
					this.spot = spot;
					this.spotForm.patchValue(spot);
				});
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
		if(this.positionWatcher) {
			navigator.geolocation.clearWatch(this.positionWatcher);
		}
	}

	save() {
		this.loading = true;
		const okCallback = data => {
			this.loading = false;
			this.alertService.success('Spot saved successfully');
			const route = [];
			route.push('/home');
			if(this.stash) {
				route.push({stash : this.stash.uuid});
			}
			this.router.navigate(route);
		};
		const errorCallback = error => {
			this.loading = false;
			this.alertService.error(error);
		};
		if(this.spot) {
			this.spotService.save(this.spot.uuid, this.spotForm.value).subscribe(okCallback, errorCallback);
		}
		else {
			//TODO find a way to chain observable
			this.spotService.create(this.spotForm.value).subscribe(spot => {
				this.stashService
					.addToStash(this.stash.uuid, spot.uuid)
					.subscribe(okCallback, errorCallback);
			},
			errorCallback);
		}
	}

	updateLocation(position) {
		if(position) {
			this.spotForm.patchValue({latitude: position.coords.latitude, longitude: position.coords.longitude});
		}
	}

	retrieveLocation() {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => this.updateLocation(position));
			if(!this.positionWatcher) {
				this.positionWatcher = navigator.geolocation.watchPosition(position => this.updateLocation(position));
			}
		}
		else {
			this.alertService.error('Geolocation is not supported by this browser');
		}
	}
}
