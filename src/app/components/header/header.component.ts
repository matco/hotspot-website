import {Subscription} from 'rxjs';

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, RoutesRecognized, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

import {MatToolbar} from '@angular/material/toolbar';
import {MatMiniFabAnchor} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';

import {User} from '@models/user';
import {TokenService} from '@services/token.service';
import {MeService} from '@services/me.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	standalone: true,
	imports: [MatToolbar, RouterLink, NgIf, MatMiniFabAnchor, MatTooltip, MatIcon]
})
export class HeaderComponent implements OnInit, OnDestroy {
	subscription?: Subscription;
	user?: User;

	constructor(
		private router: Router,
		private tokenService: TokenService,
		private meService: MeService) {}

	ngOnInit() {
		this.subscription = this.router.events.subscribe(event => {
			if(event instanceof RoutesRecognized) {
				if(event?.state?.root?.firstChild?.params['reload']) {
					this.getUser();
				}
			}
		});
		this.getUser();
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	getUser() {
		this.meService.get().subscribe(user => this.user = user);
	}

	logout(): void {
		this.user = undefined;
		this.tokenService.delete();
		this.router.navigate(['/login']);
	}
}
