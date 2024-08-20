import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthInterceptor} from './app/auth.interceptor';
import {AuthGuard} from './app/guards/authentication.guard';
import {AppService} from './app/services/app.service';
import {AlertService} from './app/services/alert.service';
import {TokenService} from './app/services/token.service';
import {MeService} from './app/services/me.service';
import {UserService} from './app/services/user.service';
import {StashService} from './app/services/stash.service';
import {SpotService} from './app/services/spot.service';
import {MapService} from './app/services/map.service';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {routes} from 'app/app.routes';

if(environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
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
		MapService,
		provideHttpClient(withInterceptorsFromDi()),
		provideAnimations(),
		provideRouter(routes),
	]
});
