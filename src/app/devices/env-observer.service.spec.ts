import { TestBed } from '@angular/core/testing';

import { EnvObserverService } from './env-observer.service';

describe('EnvObserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvObserverService = TestBed.get(EnvObserverService);
    expect(service).toBeTruthy();
  });
});
