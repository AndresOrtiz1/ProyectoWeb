import { TestBed } from '@angular/core/testing';

import { ProductoTerminadoService } from './producto-terminado.service';

describe('ProductoTerminadoService', () => {
  let service: ProductoTerminadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoTerminadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
