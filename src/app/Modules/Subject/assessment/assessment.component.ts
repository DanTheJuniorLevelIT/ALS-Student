import { Component } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [RouterModule ,MatCardModule, MatCardHeader],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent {

}
