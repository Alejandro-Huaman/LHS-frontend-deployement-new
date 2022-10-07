/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatientMedicineService } from './patient-medicine.service';

describe('Service: PatientMedicine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientMedicineService]
    });
  });

  it('should ...', inject([PatientMedicineService], (service: PatientMedicineService) => {
    expect(service).toBeTruthy();
  }));
});
