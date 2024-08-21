import {Component, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgFor} from '@angular/common';

import {MatIconButton, MatFabAnchor} from '@angular/material/button';
import {MatMenuTrigger, MatMenu, MatMenuItem} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {MatNavList, MatListItem, MatListItemMeta} from '@angular/material/list';

import {Spot} from '@models/spot';
import {Stash} from '@models/stash';

import {AlertService} from '@services/alert.service';
import {SpotService} from '@services/spot.service';
import {MapService} from '@services/map.service';

import {SpotDeletionDialog} from '../../dialogs/spot_deletion.dialog';

@Component({
	selector: 'app-spots',
	templateUrl: './spots.component.html',
	styleUrls: ['./spots.component.css'],
	standalone: true,
	imports: [MatNavList, NgFor, MatListItem, RouterLink, MatIconButton, MatListItemMeta, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, MatFabAnchor, MatTooltip]
})
export class SpotsComponent {
	@Input() spots: Spot[] = [];
	@Input() selectedSpot?: Spot;
	@Input() selectedStash!: Stash;

	constructor(
		private router: Router,
		private dialog: MatDialog,
		private alertService: AlertService,
		private spotService: SpotService,
		public mapService: MapService) {}

	deleteSpot(spot: Spot): void {
		this.dialog.open(SpotDeletionDialog).afterClosed().subscribe(result => {
			if(result) {
				this.spotService.delete(spot.uuid).subscribe({
					next: () => {
						//reset selection if deleted spot was selected spot
						if(this.selectedSpot && this.selectedSpot.uuid === spot.uuid) {
							this.router.navigate(['/home', {stash: this.selectedStash.uuid}]);
						}
						this.spots.splice(this.spots.indexOf(spot), 1);
					},
					error: () => {
						this.alertService.error('Unable to delete spot');
					}
				});
			}
		});
	}
}
