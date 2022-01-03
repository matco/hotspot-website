import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Spot } from '../../models/spot';
import { Stash } from '../../models/stash';

import { AlertService } from '../../services/alert.service';
import { SpotService } from '../../services/spot.service';

import { SpotDeletionDialog } from '../../dialogs/spot_deletion.dialog';
import { MapService } from 'app/services/map.service';

@Component({
	selector: 'app-spots',
	templateUrl: './spots.component.html',
	styleUrls: ['./spots.component.css']
})
export class SpotsComponent {
	@Input() spots: Spot[];
	@Input() selectedSpot: Spot;
	@Input() selectedStash: Stash;

	constructor(
		private router: Router,
		private dialog: MatDialog,
		private alertService: AlertService,
		private spotService: SpotService,
		public mapService: MapService) {}

	deleteSpot(spot: Spot): void {
		this.dialog.open(SpotDeletionDialog).afterClosed().subscribe(result => {
			if(result) {
				this.spotService.delete(spot.uuid).subscribe(
					data => {
						//reset selection if deleted spot was selected spot
						if(this.selectedSpot && this.selectedSpot.uuid === spot.uuid) {
							this.router.navigate(['/home', { stash: this.selectedStash.uuid }]);
						}
						this.spots.splice(this.spots.indexOf(spot), 1);
					},
					error => {
						this.alertService.error('Unable to delete spot.');
					}
				);
			}
		});
	}
}
