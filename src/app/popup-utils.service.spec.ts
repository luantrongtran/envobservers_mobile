import { TestBed } from '@angular/core/testing';

import { PopupUtilsService } from './popup-utils.service';

describe('PopupUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupUtilsService = TestBed.get(PopupUtilsService);
    expect(service).toBeTruthy();
  });
});
