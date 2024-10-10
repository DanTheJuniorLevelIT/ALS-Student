import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { EditorComponent } from '@tinymce/tinymce-angular';
import {MatRadioModule} from '@angular/material/radio';
import { Router, RouterModule } from '@angular/router';
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
  value: any;
  answervalue: any;
constructor(
  private student: StudentService,
  private route: Router
  
  ){}

  answerForm = new FormGroup({
    answer: new FormControl(''),
  });

  ngOnInit(): void {
    this.assessmentID = localStorage.getItem('assessmentID');
    this.assessmentitle = localStorage.getItem('assessmenttitle');
    this.lrn = localStorage.getItem('LRN');
    this.getQuestions(this.assessmentID, this.lrn);
    this.answerForm.get('answer')?.setValue(this.questions[this.itemno]?.answer);

    // this.getAnswers(this.questions[this.itemno]?.question_id);
  }

  getQuestions(aid: any, lrn: any){
    this.student.getQuestions(aid, lrn).subscribe((result: any)=>{
      this.questions=result;
      console.log(result);
    this.answerForm.get('answer')?.setValue(this.questions[this.itemno]?.answer);

      // this.getAnswers(this.questions[this.itemno]?.question_id);
    })
  }
  // getAnswers(qid: any){
  //   this.student.getAnswers(qid).subscribe((result: any)=>{
  //     this.answervalue=result;
  //     this.answerForm.get('answer')?.setValue(this.answervalue[0].answer);
  //     console.log(result);
  //     console.log()
  //   });
  //   // console.log(qid);
  // }
  next(i: number){
    console.log(this.itemno);
    if(this.itemno < this.questions.length && i==1) {
      this.itemno+=i;
      this.answerForm.reset();
    }
    this.answerForm.get('answer')?.setValue(this.questions[this.itemno]?.answer);


  }
  prev(i:number) {
    if(this.itemno > 0 && i==-1) {
      this.itemno+=i;
    }
    this.answerForm.get('answer')?.setValue(this.questions[this.itemno]?.answer);

  }

  onSubmit(qid: any, slrn: any) {
    const answerValue = this.answerForm.get('answer')?.value;  // Get the value from the radio buttons or input
    console.warn(answerValue);
    if (answerValue) {
      this.student.saveAnswers(qid, slrn, answerValue).subscribe((result: any) => {
        console.log(result);
      });
    }
  }

 keyUpFunction(qid:any, slrn: any) {
  console.log(qid)
  console.log(slrn)
  this.onSubmit(qid, slrn);
}

  keyUpTiny(event: any,qid: any, slrn: any){
    console.log(event.event.key);
    const chars = [' ', '.', ',', '!'];
    if (chars.find(c => c == event.event.key ) ) {
      this.onSubmit(qid, slrn);  
    }
    
  }

  submitRadio(event: any, qid: any, slrn: any) {
    this.student.saveAnswers(qid,slrn, event).subscribe((result:any) => {
      console.log(result);
    })
  }
  submitAs(){
    this.student.saveAssessmentsAnswer(this.assessmentID, this.lrn).subscribe((result:any)=> {
      console.log(result);
      this.route.navigate(['/main/Subject/subjectmain/modules/assessmentfinish']);
    })
  }


}
