export class User {
	handle: string;
	email: string;
	password: string;
	firstname: string;
	lastname: string;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
