import { TestBed } from '@angular/core/testing';

import { MateriaPrimaServicesService } from './materia-prima.services.service';

describe('MateriaPrimaServicesService', () => {
  let service: MateriaPrimaServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaPrimaServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
