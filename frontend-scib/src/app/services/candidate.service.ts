import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/candidates';

  private candidates$ = new BehaviorSubject<Candidate[]>(
    this.loadFromStorage()
  );

  private loadFromStorage(): Candidate[] {
    const json = localStorage.getItem('candidates');
    return json ? JSON.parse(json) : [];
  }

  private saveToStorage(data: Candidate[]) {
    localStorage.setItem('candidates', JSON.stringify(data));
  }

  getCandidates$() {
    return this.candidates$.asObservable();
  }

  uploadCandidate(data: FormData) {
    return this.http.post<Candidate>(this.apiUrl, data);
  }

  addCandidate(candidate: Candidate) {
    const current = this.candidates$.value;
    const updated = [...current, candidate];
    this.saveToStorage(updated);
    this.candidates$.next(updated); // 🔄 Notifica el cambio
  }
}
