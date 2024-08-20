import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {AlertComponent} from './directives/alert.component';
import {RouterOutlet} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [HeaderComponent, MatSidenavContainer, MatSidenavContent, AlertComponent, RouterOutlet]
})
export class AppComponent {}
