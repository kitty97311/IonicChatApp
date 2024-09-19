import { TestBed } from '@angular/core/testing';

import { CriasService } from './crias.service';

describe('CriasService', () => {
  let service: CriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
