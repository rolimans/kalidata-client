import { TestBed, inject } from '@angular/core/testing';

import { GuardAuthService } from './guard-auth.service';

describe('GuardAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardAuthService]
    });
  });

  it('should be created', inject([GuardAuthService], (service: GuardAuthService) => {
    expect(service).toBeTruthy();
  }));
});
