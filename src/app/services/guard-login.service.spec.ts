import { TestBed, inject } from '@angular/core/testing';

import { GuardLoginService } from './guard-login.service';

describe('GuardLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardLoginService]
    });
  });

  it('should be created', inject([GuardLoginService], (service: GuardLoginService) => {
    expect(service).toBeTruthy();
  }));
});
