import { Injectable } from '@angular/core';

export enum AppMode {
	DEV,
	PROD
}

@Injectable()
export class AppService {
	constructor() {}
	public static APP_MODE: AppMode = AppMode.DEV;
	public static API_URL = 'http://localhost:8080';
}
