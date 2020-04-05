import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Stash } from '../../models/stash';

import { StashService } from '../../services/stash.service';
import { AlertService } from '../../services/alert.service';

import { StashDeletionDialog } from '../../dialogs/stash_deletion.dialog';

@Component({
	moduleId: module.id,
	selector: 'app-stashs',
	templateUrl: './stashs.component.html',
	styleUrls: ['./stashs.component.css']
})
export class StashsComponent {
	@Input() stashs: Stash[];
	@Input() selectedStash: Stash;

	constructor(
		private router: Router,
		private dialog: MatDialog,
		private alertService: AlertService,
		private stashService: StashService) {}

	deleteStash(stash: Stash): void {
		this.dialog.open(StashDeletionDialog).afterClosed().subscribe(result => {
			if(result) {
				this.stashService.delete(stash.uuid).subscribe(
					data => {
						//reset selection if deleted stash was selected stash
						if(this.selectedStash && this.selectedStash.uuid === stash.uuid) {
							this.router.navigate(['/home']);
						}
						this.stashs.splice(this.stashs.indexOf(stash), 1);
					},
					error => {
						this.alertService.error('Unable to delete stash.');
					}
				);
			}
		});
	}
}
