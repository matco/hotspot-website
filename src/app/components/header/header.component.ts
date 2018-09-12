import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';
import { AppService } from '../../services/app.service';
import { TokenService } from '../../services/token.service';
import { MeService } from '../../services/me.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	subscription;
	user: User;

	constructor(
		private router: Router,
		private alertService: AlertService,
		private appService: AppService,
		private tokenService: TokenService,
		private meService: MeService) {}

	ngOnInit() {
		this.subscription = this.router.events.subscribe(event => {
			if(event instanceof RoutesRecognized) {
				if(event.state.root.firstChild.params['reload']) {
					this.getUser();
				}
			}
		});
		this.getUser();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
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
