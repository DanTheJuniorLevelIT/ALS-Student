import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatCardModule, MatCardHeader } from '@angular/material/card';
// import { MatPseudoCheckbox, MatPseudoCheckboxModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RouterModule ,MatCardModule, MatCardHeader],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  isChecked = true;
}
