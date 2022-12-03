import { TestBed } from '@angular/core/testing';

import { SpendingsService } from './spendings.service';

describe('SpendingsService', () => {
  let service: SpendingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
