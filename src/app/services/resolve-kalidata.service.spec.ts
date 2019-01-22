import { TestBed, inject } from '@angular/core/testing';

import { ResolveKalidataService } from './resolve-kalidata.service';

describe('ResolveKalidataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveKalidataService]
    });
  });

  it('should be created', inject([ResolveKalidataService], (service: ResolveKalidataService) => {
    expect(service).toBeTruthy();
  }));
});
