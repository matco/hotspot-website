import { forkJoin } from 'rxjs';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MapService } from 'app/services/map.service';
import { GoogleMap } from '@angular/google-maps';

import { Stash } from '../../models/stash';
import { Spot } from '../../models/spot';

import { StashService } from '../../services/stash.service';
import { SpotService } from '../../services/spot.service';

@Component({
	moduleId: module.id,
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	stashs: Stash[];
	selectedStash: Stash;
	spots: Spot[];
	selectedSpot: Spot;
	center = {lat: 24, lng: 12};
	subscription;

	@ViewChild(GoogleMap, {static: true}) map: GoogleMap;

	constructor(
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog,
		private stashService: StashService,
		private spotService: SpotService,
		public mapService: MapService) {}

	ngOnInit() {
		this.subscription = this.activatedRoute.params.subscribe(parameters => {
			if(parameters['stash']) {
				const stashUuid = parameters['stash'];
				if(!this.selectedStash || this.selectedStash.uuid !== stashUuid) {
					forkJoin({
						stash : this.stashService.get(stashUuid),
						spots : this.stashService.getSpots(stashUuid)
					}).subscribe(result => {
						//find where to center map before selecting stash
						const bounds = new google.maps.LatLngBounds();
						result.spots.forEach(s => bounds.extend({lat: s.latitude, lng: s.longitude}));
						this.map.fitBounds(bounds);
						this.selectedStash = result.stash;
						this.spots = result.spots;
					});
				}
				if(parameters['spot']) {
					const spotUuid = parameters['spot'];
					if(!this.selectedSpot || this.selectedSpot.uuid !== spotUuid) {
						this.spotService.get(spotUuid).subscribe(spot => {
							this.selectedSpot = spot;
							this.center = {lat: spot.latitude, lng: spot.longitude};
						});
					}
				}
				else {
					this.selectedSpot = undefined;
				}
			}
			else {
				this.selectedStash = undefined;
			}
		});
		this.stashService.all().subscribe(stashs => this.stashs = stashs);
	}

}
