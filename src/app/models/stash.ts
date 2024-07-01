import {Spot} from './spot';

export interface Stash {
	uuid: string;
	name: string;
	description?: string;
	spots: Spot[];
}
