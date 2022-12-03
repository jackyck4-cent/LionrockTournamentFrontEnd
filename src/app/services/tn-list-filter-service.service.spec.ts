import { TestBed } from '@angular/core/testing';

import { TnListFilterServiceService } from './tn-list-filter-service.service';

describe('TnListFilterServiceService', () => {
  let service: TnListFilterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TnListFilterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
