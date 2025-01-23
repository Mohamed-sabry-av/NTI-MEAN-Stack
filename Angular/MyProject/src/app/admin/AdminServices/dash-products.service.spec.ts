import { TestBed } from '@angular/core/testing';

import { DashProductsService } from './dash-products.service';

describe('DashProductsService', () => {
  let service: DashProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
