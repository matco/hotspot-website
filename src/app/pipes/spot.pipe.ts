import { Pipe, PipeTransform } from '@angular/core';
import { Spot } from '../models/spot';

@Pipe({
	name: 'spot'
})
export class SpotPipe implements PipeTransform {

	transform(spot: Spot): string {
		return spot.name;
	}
}
