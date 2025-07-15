import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { CandidateTableComponent } from './components/candidate-table/candidate-table.component';

@Component({
  selector: 'app-root',
  imports: [CandidateTableComponent, CandidateFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-scib';
}
