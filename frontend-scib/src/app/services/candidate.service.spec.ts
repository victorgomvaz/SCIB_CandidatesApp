/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CandidateService } from './candidate.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Candidate } from '../models/candidate.model';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Candidate', () => {
  let service: CandidateService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CandidateService, provideHttpClientTesting()],
    });
    localStorage.clear();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const testService = TestBed.inject(CandidateService);
    expect(testService).toBeTruthy();
  });

  it('should emit an empty array when no candidates in localStorage', (done) => {
    
    const testService = TestBed.inject(CandidateService);
    testService.getCandidates$().subscribe((candidates) => {
      expect(candidates).toEqual([]);
      done();
    });
  });

  it('should emit candidates from localStorage', (done) => {
    const mockCandidate: Candidate = {
      name: 'Test',
      surname: 'User',
      availability: true,
      seniority: 'senior',
      yearsOfExperience: 0,
    };

    localStorage.setItem('candidates', JSON.stringify([mockCandidate]));

    const testService = TestBed.inject(CandidateService);

    testService.getCandidates$().subscribe((candidates) => {
      expect(candidates[0]).toEqual(mockCandidate);
      done();
    });
  });

  it('should post a candidate', () => {
    const mockCandidate: Candidate = {
      name: 'Test',
      surname: 'User',
      availability: true,
      seniority: 'senior',
      yearsOfExperience: 0,
    };
    const formData = new FormData();
    formData.append('name', mockCandidate.name);
    formData.append('surname', mockCandidate.surname);
    formData.append('file', new Blob(), 'test.xlsx');
    const testService = TestBed.inject(CandidateService);
    testService.uploadCandidate(formData).subscribe((res) => {
      expect(res).toEqual(mockCandidate);
    });

    const req = httpMock.expectOne('http://localhost:3000/candidates');
    expect(req.request.method).toBe('POST');
    req.flush(mockCandidate);
  });

  // afterEach(() => {
  //   httpMock.verify();
  // });
});
