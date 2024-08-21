import {Injectable} from '@angular/core';

@Injectable()
export class MapService {
	generateLabel(index: number): string {
		return String.fromCharCode(index % 26 + 65);
	}
}
