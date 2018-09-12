/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SpotService } from './spot.service';

describe('SpotService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
		providers: [SpotService]
		});
	});

	it('should ...', inject([SpotService], (service: SpotService) => {
		expect(service).toBeTruthy();
	}));
});
