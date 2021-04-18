import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { NetworkErrorComponent } from './components/network-error/network-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { StashComponent } from './components/stash/stash.component';
import { SpotComponent } from './components/spot/spot.component';
import { AuthGuard } from './guards/authentication.guard';

const routes: Routes = [
	{ path: 'network-error', component: NetworkErrorComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'users/:handle', component: UserComponent, canActivate: [AuthGuard] },
	{ path: 'stashes/:uuid', component: StashComponent, canActivate: [AuthGuard] },
	{ path: 'stash', component: StashComponent, canActivate: [AuthGuard] },
	{ path: 'spots/:uuid', component: SpotComponent, canActivate: [AuthGuard] },
	{ path: 'spot', component: SpotComponent, canActivate: [AuthGuard] },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	//no url redirect to stashes
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	//otherwise redirect to not found error page
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class RoutingModule {}
