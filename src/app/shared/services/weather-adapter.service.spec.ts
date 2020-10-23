import { TestBed } from '@angular/core/testing';

import { WeatherAdapterService } from './weather-adapter.service';

describe('WeatherAdapterService', () => {
  let service: WeatherAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
