import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-table',
  templateUrl: './candidate-table.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  styleUrls: ['./candidate-table.component.scss'],
})
export class CandidateTableComponent implements OnInit {
  candidates: Candidate[] = [];
  displayedColumns = [
    'name',
    'surname',
    'seniority',
    'yearsOfExperience',
    'availability',
  ];

  constructor(private service: CandidateService) {}

  ngOnInit(): void {
    this.service.getCandidates$().subscribe((c) => (this.candidates = c));
  }
}
