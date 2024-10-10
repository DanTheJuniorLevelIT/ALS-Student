import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { StudentService } from '../../../student.service';

@Component({
  selector: 'app-inputcheckers',
  standalone: true,
  imports: [RouterModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditorComponent, MatRadioModule, CommonModule, ReactiveFormsModule],
  templateUrl: './inputcheckers.component.html',
  styleUrl: './inputcheckers.component.css'
})
export class InputcheckersComponent implements OnInit {

  assessmentID: any;
  assessmentitle: any;
  questions: any;
  lrn: any;
  itemno = 0;

  constructor (private student: StudentService) {}

  ngOnInit(): void {
    this.assessmentID = localStorage.getItem('assessmentID');
    // this.getQuestions(this.assessmentID);
    this.assessmentitle = localStorage.getItem('assessmenttitle');
    this.lrn = localStorage.getItem('LRN');
    // console.log(this.questions[this.itemno-this.questionID].question_id)
  }

  // getQuestions(aid: any){
  //   this.student.getQuestions(aid).subscribe((result: any)=>{
  //     this.questions=result;
      
  //     console.log(result);
  //   })
  // }

  answerForm = new FormGroup({
    answer: new FormControl(''),
    identification: new FormControl(''),
  })

  onSubmit() {
    console.log(this.answerForm.value);
  }
}
