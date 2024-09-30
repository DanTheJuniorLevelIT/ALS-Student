import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { EditorComponent } from '@tinymce/tinymce-angular';
import {MatRadioModule} from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questionnaires',
  standalone: true,
  imports: [RouterModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditorComponent, MatRadioModule, CommonModule, ReactiveFormsModule],
  templateUrl: './questionnaires.component.html',
  styleUrl: './questionnaires.component.css'
})
export class QuestionnairesComponent implements OnInit{
  assessmentID: any;
  assessmentitle: any;
  questions: any;
  lrn: any;
  itemno = 0;
  questionID = 1;
constructor(private student: StudentService){}

  answerForm = new FormGroup({
    answer: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.assessmentID = localStorage.getItem('assessmentID');
    this.getQuestions(this.assessmentID);
    this.assessmentitle = localStorage.getItem('assessmenttitle');
    this.lrn = localStorage.getItem('LRN');
    // console.log(this.questions[this.itemno-this.questionID].question_id)
  }

  getQuestions(aid: any){
    this.student.getQuestions(aid).subscribe((result: any)=>{
      this.questions=result;
      
      console.log(result);
    })
  }
  
  next(i: number){
    if(this.itemno < this.questions.length-1 && i==1) {
      this.itemno+=i;
    }
  }
  prev(i:number) {
    if(this.itemno > 0 && i==-1) {
      this.itemno+=i;
    }
  }

  onSubmit(qid: any, slrn: any) {
    const answerValue = this.answerForm.get('answer')?.value; // Get the value of the answer field
    this.student.saveAnswers(qid, slrn, answerValue).subscribe((result: any) => {
        console.log(result);
    });
}



}
