import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

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
	subscription;

	constructor(
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog,
		private stashService: StashService,
		private spotService: SpotService) {}

	ngOnInit() {
		this.subscription = this.activatedRoute.params.subscribe(parameters => {
			if(parameters['stash']) {
				const stashUuid = parameters['stash'];
				this.stashService.get(stashUuid).subscribe(stash => this.selectedStash = stash);
				this.stashService.getSpots(stashUuid).subscribe(spots => this.spots = spots);
				if(parameters['spot']) {
					const spotUuid = parameters['spot'];
					this.spotService.get(spotUuid).subscribe(spot => this.selectedSpot = spot);
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

