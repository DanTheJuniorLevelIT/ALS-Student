import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { EditorComponent } from '@tinymce/tinymce-angular';
import {MatRadioModule} from '@angular/material/radio';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-questionnaires',
  standalone: true,
  imports: [RouterModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditorComponent, MatRadioModule],
  templateUrl: './questionnaires.component.html',
  styleUrl: './questionnaires.component.css'
})
export class QuestionnairesComponent {
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
