export class Alert {
	message: string;
	type: string;

	constructor(options: Alert) {
		Object.assign(this, options);
	}
}