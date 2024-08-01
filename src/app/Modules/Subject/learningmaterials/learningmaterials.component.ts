import { Component } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-learningmaterials',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatCardHeader],
  templateUrl: './learningmaterials.component.html',
  styleUrl: './learningmaterials.component.css'
})
export class LearningmaterialsComponent {

}
