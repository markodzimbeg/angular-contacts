import { TestBed } from '@angular/core/testing';

import { LocalContactsService } from './local-contacts.service';

describe('LocalContactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalContactsService = TestBed.get(LocalContactsService);
    expect(service).toBeTruthy();
  });
});
