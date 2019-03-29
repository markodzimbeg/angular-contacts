import { TestBed } from '@angular/core/testing';

import { ContactFactoryService } from './contact-factory.service';

describe('ContactFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactFactoryService = TestBed.get(ContactFactoryService);
    expect(service).toBeTruthy();
  });
});
