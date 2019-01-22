import { TestBed, inject } from '@angular/core/testing';

import { KalidataService } from './kalidata.service';

describe('KalidataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KalidataService]
    });
  });

  it('should be created', inject([KalidataService], (service: KalidataService) => {
    expect(service).toBeTruthy();
  }));
});
