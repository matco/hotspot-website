import {Component} from '@angular/core';

import {MatDialogTitle, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
	selector: 'app-spot-deletion-dialog',
	templateUrl: './spot_deletion.dialog.html',
	standalone: true,
	imports: [MatDialogTitle, MatDialogActions, MatButton, MatDialogClose]
})
export class SpotDeletionDialog {}
