import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatIconModule, MatInputModule, MatButtonModule, MatCardModule, MatSidenavModule, MatListModule, MatToolbarModule, MatTabsModule, MatTooltipModule } from '@angular/material';

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
import { StashsComponent } from './components/stashs/stashs.component';
import { StashComponent } from './components/stash/stash.component';
import { SpotsComponent } from './components/spots/spots.component';
import { SpotComponent } from './components/spot/spot.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		RoutingModule,
		FormsModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatSidenavModule,
		MatListModule,
		MatTabsModule,
		MatTooltipModule
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
		StashsComponent,
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
		SpotService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
