import { TestBed } from '@angular/core/testing';

import { FilestoreService } from './filestore.service';

describe('FilestoreService', () => {
  let service: FilestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
