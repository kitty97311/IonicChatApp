import { TestBed } from '@angular/core/testing';

import { PesajeService } from './pesaje.service';

describe('PesajeService', () => {
  let service: PesajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
