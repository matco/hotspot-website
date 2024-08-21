import {Subscription} from 'rxjs';

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

import {MatFormField, MatError} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatAnchor} from '@angular/material/button';

import {Stash} from '@models/stash';
import {Spot} from '@models/spot';

import {SpotService} from '@services/spot.service';
import {StashService} from '@services/stash.service';
import {AlertService} from '@services/alert.service';

@Component({
	templateUrl: './spot.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormField, MatInput, NgIf, MatError, MatButton, MatAnchor, RouterLink]
})
export class SpotComponent implements OnInit, OnDestroy {
	subscription?: Subscription;
	loading = false;
	positionWatcher?: number;

	stash?: Stash;
	spot?: Spot;
	spotForm = new FormGroup(
		{
			name: new FormControl('', {validators: Validators.required, nonNullable: true}),
			latitude: new FormControl(0, {validators: Validators.required, nonNullable: true}),
			longitude: new FormControl(0, {validators: Validators.required, nonNullable: true}),
			description: new FormControl('')
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
		this.subscription?.unsubscribe();
		if(this.positionWatcher) {
			navigator.geolocation.clearWatch(this.positionWatcher);
		}
	}

	save() {
		this.loading = true;
		const okCallback = () => {
			this.loading = false;
			this.alertService.success('Spot saved successfully');
			const route = [];
			route.push('/home');
			if(this.stash) {
				route.push({stash: this.stash.uuid});
			}
			this.router.navigate(route);
		};
		const errorCallback = (response: HttpErrorResponse) => {
			this.loading = false;
			this.alertService.error(response.error.message);
		};
		if(this.spot) {
			this.spotService.save(this.spot.uuid, this.spotForm.value as Spot).subscribe({next: okCallback, error: errorCallback});
		}
		else {
			//TODO find a way to chain observable
			this.spotService.create(this.spotForm.value as Spot).subscribe({
				next: spot => {
					if(this.stash) {
						this.stashService
							.addToStash(this.stash.uuid, spot.uuid)
							.subscribe({next: okCallback, error: errorCallback});
					}
					else {
						okCallback();
					}
				},
				error: errorCallback
			});
		}
	}

	updateLocation(position: GeolocationPosition) {
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
