import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { EditorComponent } from '@tinymce/tinymce-angular';
import {MatRadioModule} from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';

@Component({
  selector: 'app-questionnaires',
  standalone: true,
  imports: [RouterModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditorComponent, MatRadioModule],
  templateUrl: './questionnaires.component.html',
  styleUrl: './questionnaires.component.css'
})
export class QuestionnairesComponent implements OnInit{
  assessmentID: any;
  questions: any;

constructor(private student: StudentService){}

  ngOnInit(): void {
    this.assessmentID = localStorage.getItem('assessmentID')
    this.getQuestions(this.assessmentID);
  }
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  tf: string[] = ['True', 'False'];

  getQuestions(aid: any){
    this.student.getQuestions(aid).subscribe((result: any)=>{
      this.questions=result;
    })
  }
}
