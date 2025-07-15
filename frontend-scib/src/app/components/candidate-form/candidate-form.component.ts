import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CandidateService } from '../../services/candidate.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-candidate-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})
export class CandidateFormComponent {
  file: File | null = null;

  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
  });

  constructor(private service: CandidateService) {}

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = target.files?.[0] ?? null;
  }

  submit() {
    if (!this.form.valid || !this.file) return;

    const formData = new FormData();
    const values = this.form.getRawValue();

    formData.append('name', values.name);
    formData.append('surname', values.surname);
    formData.append('excel', this.file);

    this.service.uploadCandidate(formData).subscribe((candidate) => {
      this.service.addCandidate(candidate); // 🔁 actualiza la tabla en vivo
      this.form.reset();
      this.file = null;
    });
  }
}
