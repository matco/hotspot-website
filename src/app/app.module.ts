import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './guards/authentication.guard';
import { AppService } from './services/app.service';
import { AlertService } from './services/alert.service';
import { TokenService } from './services/token.service';
import { MeService } from './services/me.service';
import { UserService } from './services/user.service';
import { SpotService } from './services/spot.service';
import { StashService } from './services/stash.service';

import { SpotPipe } from './pipes/spot.pipe';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';

import { AlertComponent } from './directives/alert.component';

import { StashDeletionDialog } from './dialogs/stash_deletion.dialog';
import { SpotDeletionDialog } from './dialogs/spot_deletion.dialog';
import { UserDeletionDialog } from './dialogs/user_deletion.dialog';

import { NetworkErrorComponent } from './components/network-error/network-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { StashesComponent } from './components/stashes/stashes.component';
import { StashComponent } from './components/stash/stash.component';
import { SpotsComponent } from './components/spots/spots.component';
import { SpotComponent } from './components/spot/spot.component';
import { MapService } from './services/map.service';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		RoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatChipsModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatSidenavModule,
		MatListModule,
		MatTabsModule,
		MatTooltipModule,
		GoogleMapsModule
	],
	declarations: [
		AppComponent,
		AlertComponent,
		NetworkErrorComponent,
		NotFoundComponent,
		RegisterComponent,
		LoginComponent,
		UserComponent,
		HeaderComponent,
		HomeComponent,
		StashesComponent,
		StashComponent,
		SpotsComponent,
		SpotComponent,
		SpotPipe,
		StashDeletionDialog,
		SpotDeletionDialog,
		UserDeletionDialog
	],
	entryComponents: [
		StashDeletionDialog,
		SpotDeletionDialog,
		UserDeletionDialog
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
		AuthGuard,
		AppService,
		AlertService,
		TokenService,
		MeService,
		UserService,
		StashService,
		SpotService,
		MapService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
