import {Component} from '@angular/core';

import {MatDialogTitle, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
	selector: 'app-stash-deletion-dialog',
	templateUrl: './stash_deletion.dialog.html',
	standalone: true,
	imports: [MatDialogTitle, MatDialogActions, MatButton, MatDialogClose]
})
export class StashDeletionDialog {}
