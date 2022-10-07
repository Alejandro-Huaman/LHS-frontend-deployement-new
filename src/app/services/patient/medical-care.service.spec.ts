/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedicalCareService } from './medical-care.service';

describe('Service: MedicalCare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalCareService]
    });
  });

  it('should ...', inject([MedicalCareService], (service: MedicalCareService) => {
    expect(service).toBeTruthy();
  }));
});
