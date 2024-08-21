import {Component, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgFor} from '@angular/common';

import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger, MatMenu, MatMenuItem} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatNavList, MatListItem, MatListItemMeta} from '@angular/material/list';
import {MatIconButton, MatFabAnchor} from '@angular/material/button';

import {Stash} from '@models/stash';

import {StashService} from '@services/stash.service';
import {AlertService} from '@services/alert.service';

import {StashDeletionDialog} from '../../dialogs/stash_deletion.dialog';

@Component({
	selector: 'app-stashes',
	templateUrl: './stashes.component.html',
	styleUrls: ['./stashes.component.css'],
	standalone: true,
	imports: [MatNavList, NgFor, MatListItem, RouterLink, MatIconButton, MatListItemMeta, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, MatFabAnchor, MatTooltip]
})
export class StashesComponent {
	@Input() stashes: Stash[] = [];
	@Input() selectedStash?: Stash;

	constructor(
		private router: Router,
		private dialog: MatDialog,
		private alertService: AlertService,
		private stashService: StashService) {}

	deleteStash(stash: Stash): void {
		this.dialog.open(StashDeletionDialog).afterClosed().subscribe(result => {
			if(result) {
				this.stashService.delete(stash.uuid).subscribe({
					next: () => {
						//reset selection if deleted stash was selected stash
						if(this.selectedStash && this.selectedStash.uuid === stash.uuid) {
							this.router.navigate(['/home']);
						}
						this.stashes.splice(this.stashes.indexOf(stash), 1);
					},
					error: () => {
						this.alertService.error('Unable to delete stash');
					}
				});
			}
		});
	}
}
