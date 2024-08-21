import {ApplicationConfig} from '@angular/core';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';
import {AuthGuard} from './guards/authentication.guard';
import {AppService} from '@services/app.service';
import {AlertService} from '@services/alert.service';
import {TokenService} from '@services/token.service';
import {MeService} from '@services/me.service';
import {UserService} from '@services/user.service';
import {StashService} from '@services/stash.service';
import {SpotService} from '@services/spot.service';
import {MapService} from '@services/map.service';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {routes} from 'app/app.routes';

export const appConfig: ApplicationConfig = {
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
};
