export class Spot {
	uuid: string;
	name = '';
	latitude: number;
	longitude: number;
	description = '';

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
