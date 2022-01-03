import { combineLatest, of } from 'rxjs';
import { map, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MapService } from 'app/services/map.service';
import { GoogleMap } from '@angular/google-maps';

import { Stash } from '../../models/stash';
import { Spot } from '../../models/spot';

import { StashService } from '../../services/stash.service';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	stashes: Stash[] = [];
	selectedStash?: Stash;
	spots: Spot[] = [];
	selectedSpot?: Spot;
	center = {lat: 24, lng: 12};

	@ViewChild(GoogleMap, {static: true}) map!: GoogleMap;

	constructor(
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog,
		private stashService: StashService,
		public mapService: MapService) {}

	ngOnInit() {
		combineLatest([
			this.stashService.all(),
			this.activatedRoute.params.pipe(
				map(parameters => parameters['stash'] as string),
				distinctUntilChanged(),
				switchMap(stashUuid => {
					const $spots = stashUuid ? this.stashService.getSpots(stashUuid) : of([]);
					return $spots.pipe(
						map(spots => {
							return {stashUuid, spots};
						})
					);
				})
			),
			this.activatedRoute.params.pipe(
				map(parameters => parameters['spot'] as string),
				distinctUntilChanged()
			)
		]).subscribe(([stashes, {stashUuid, spots}, spotUuid]) => {
			this.stashes = stashes;
			this.selectedStash = this.stashes.find(s => s.uuid === stashUuid);
			this.spots = spots;
			this.selectedSpot = this.spots.find(s => s.uuid === spotUuid);
		});
	}
}
