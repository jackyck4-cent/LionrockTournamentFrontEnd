import { TestBed } from '@angular/core/testing';

import { DummyBackendService } from './dummy-backend.service';

describe('DummyBackendService', () => {
  let service: DummyBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
