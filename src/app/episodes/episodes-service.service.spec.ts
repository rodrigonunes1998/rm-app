import { TestBed } from '@angular/core/testing';

import { EpisodesServiceService } from './episodes-service.service';

describe('EpisodesServiceService', () => {
  let service: EpisodesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
