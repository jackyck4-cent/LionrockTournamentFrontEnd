import { TestBed } from '@angular/core/testing';

import { ApibackendService } from './apibackend.service';

describe('ApibackendService', () => {
  let service: ApibackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApibackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
