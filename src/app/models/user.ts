export class User {
	handle: string;
	email: string;
	firstname: string;
	lastname: string;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
