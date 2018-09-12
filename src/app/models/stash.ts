import { Spot } from './spot';

export class Stash {
	uuid: string;
	name = '';
	description = '';
	spots: Spot[] = [];

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
