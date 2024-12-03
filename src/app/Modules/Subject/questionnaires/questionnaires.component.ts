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
import Swal from 'sweetalert2';
import { MatProgressBarModule} from '@angular/material/progress-bar';


import { response } from 'express';

@Component({
  selector: 'app-questionnaires',
  standalone: true,
  imports: [RouterModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatButtonModule, EditorComponent, MatRadioModule, CommonModule, ReactiveFormsModule],
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
  file: any;
  progress = 0;
  selectedFile: File | null = null;
  isUploading = false;
  assessment: any;
  learner: any;
  File: any;
  Filelink: any;
  Filename: any;
  assessmentans: any;
  newFileUrl:any;
  isLoading = false;
  answer: any;


constructor(
  private student: StudentService,
  private route: Router
  
  ){}

  answerForm = new FormGroup({
    answer: new FormControl(''),
    // file: new FormControl('')

  });

  ngOnInit(): void {
    this.assessmentID = localStorage.getItem('assessmentID');
    this.assessmentitle = localStorage.getItem('assessmenttitle');
    this.lrn = localStorage.getItem('LRN');
    this.spinner(this.assessmentID, this.lrn);
    this.getFile(this.assessmentID, this.lrn);
    this.getLearnerFile(this.lrn,this.assessmentID);
    console.log(this.File);
    console.log(this.assessment);
    

    // this.getAnswers(this.questions[this.itemno]?.question_id);
  }

getQuestions(aid: any, lrn: any){
  this.student.getQuestions(aid, lrn).subscribe((result: any)=>{
  this.getLearnerFile(this.lrn, this.assessmentID);
  this.questions=result;
  console.log(result);
  // this.answerForm.get('answer')?.setValue(this.questions[this.itemno]?.answer);
  this.answer = this.questions[this.itemno]?.user_answer;
  console.log(this.lrn)
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
next(i: number): void {
  if (this.itemno < this.questions.length && i == 1) {
    // Save the current answer before navigating
    const answerValue = this.answerForm.get('answer')?.value;
    this.spinner(this.assessmentID, this.lrn);
    if (answerValue) {
      this.student.saveAnswers(this.questions[this.itemno]?.question_id, this.lrn, answerValue).subscribe((result: any) => {
        this.questions[this.itemno].user_answer = answerValue;
        this.itemno += i;
        console.log(this.questions[this.itemno]);
        this.answer = this.questions[this.itemno]?.user_answer;
        console.log(result);
      });
      // this.onSubmit(this.questions[this.itemno]?.question_id, this.lrn);
    }

    // Move to the next question
   

    // Set the form's answer to the next question's answer if available
    
  }
}

prev(i: number): void {
  if (this.itemno > 0 && i == -1) {
    // Save the current answer before navigating
    const answerValue = this.answerForm.get('answer')?.value;
      // Move to the previous question
      
    if (answerValue) {
      this.spinner(this.assessmentID, this.lrn);
      this.student.saveAnswers(this.questions[this.itemno]?.question_id, this.lrn, answerValue).subscribe((result: any) => {
        this.questions[this.itemno].user_answer = answerValue;
        this.itemno += i;
        console.log(this.questions[this.itemno]);
        this.answer = this.questions[this.itemno]?.user_answer;
        console.log(result);
      });
      // this.onSubmit(this.questions[this.itemno]?.question_id, this.lrn);  // Save the answer for the current question
    }

  
    // Set the form's answer to the previous question's answer if available
  }
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

saveAndSubmit(qid: any, slrn: any): void {
  const answerValue = this.answerForm.get('answer')?.value;

  if (answerValue) {
    // Save the last question's answer
    this.onSubmit(qid, slrn);

    // Proceed with submission only after saving the answer
    this.student.saveAnswers(qid, slrn, answerValue).subscribe({
      next: () => {
        console.log('Last answer saved successfully.');
        // Proceed with submitting the entire assessment
        this.submitAs();
      },
      error: (err: any) => {
        console.error('Error saving the last answer:', err);
      },
    });
  } else {
    // If no answer is provided for the last question, directly submit the assessment
    this.submitAs();
  }
}


submitAs(){
  this.student.saveAssessmentsAnswer(this.assessmentID, this.lrn).subscribe((result:any)=> {
    console.log(result);
    this.route.navigate(['/main/Subject/subjectmain/modules/assessmentfinish']);
  })
}

onFileSelected(event: any){
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    console.log(this.selectedFile);
  }
}
  // onUploadFile(){
  //   if(!this.selectedFile) {
  //     alert('Please select a file first');
  //     return;
  //   }
  //   this.lrn = localStorage.getItem('LRN');
  //   this.assessmentID = localStorage.getItem('assessmentID');
  //   if (this.selectedFile) {
  //     this.student.uploadFile(this.lrn, this.assessmentID, this.selectedFile).subscribe(
  //       (response: any) => {
  //         console.log('File Uploaded Successfully:', response)
  //         this.route.navigate(['/main/Subject/subjectmain/modules/assessmentfinish']);
  //       },
  //       (error: any) => {
  //         console.error('Error Uploading File:', error);
  //         alert('Error Uploading File');
  //       }
  //     );
  //   }else{
  //     alert('No file selected or AssessmentID and LRN is missing');
  //   }
  // }

uploadFile() {
  if (!this.selectedFile) {
      alert('Please select a file first');
      return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile); // Changed from 'profile_picture' to 'file'
  formData.append('lrn', this.lrn);
  formData.append('assessmentid', this.assessmentID); // Added line to append assessment ID

  this.student.uploadFile(formData).subscribe((result: any) => {
      console.log(result.file);
      this.File = result.file;
      this.newFileUrl = `http://localhost:8000/assets/files/${result.file}`;

      this.isUploading = true;
      this.progress = 20;

      const interval = setInterval(() => {
          if (this.progress < 100) {
              this.progress += 20;
          } else {
              clearInterval(interval);
              this.isUploading = false;
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "File Uploaded Successfully", // Updated message
                  showConfirmButton: false,
                  timer: 1500
              });

              // this.route.navigate(['/main/Subject/subjectmain/modules/assessmentfinish']);
              // Handle the result as needed, e.g., update the UI or store the file path
              // If you need to update a specific file path, you can do it here
              // this.filePath = `http://localhost:8000/assets/files/${result.file}`;
          }
      }, 100);

      // Optionally, you can call a method to refresh or update the UI
      this.getLearnerFile(this.lrn,this.assessmentID);
  }, (error) => {
      console.error('File upload failed', error);
      Swal.fire({
          position: "center",
          icon: "error",
          title: "File Upload Failed",
          text: error.message || 'An error occurred while uploading the file.',
          showConfirmButton: true
      });
  });
}

getLearnerFile(lrn: any, aid: any): void {
  this.student.getAnswerFile(lrn, aid).subscribe(
      (result: any) => {
        console.log(result);
          this.assessmentans = result.assessment;

          // Check if the learner has a file, else use icon.jpg
            this.Filelink = `http://localhost:8000/assets/files/${result.file}`; // Updated to use the file path
            this.Filename = result.file;
            this.Filename = this.Filelink.split('/').pop();
          // if (result.file) {
          // } else {
          //     this.Filelink = 'assets/icon.jpg'; // Fallback to default icon
          // }
      },
      (error) => {
          console.error('Error fetching learner data', error);
      }
  );
}

getFile(aid: any, lrn:any){
  this.student.getFile(aid, lrn).subscribe((result:any) => {
    this.assessment = result;
    console.log(result);
  });;
}
  // getScore(aid: any, lrn: any){
  //   this.student.getScore(aid, lrn).subscribe((result:any)=>{
  //     this.score = result;
  //     console.log(result);
  //   });
  // }

spinner(aid: any, lrn: any) {
  this.isLoading = true;
  this.getQuestions(aid, lrn);
  setTimeout(() => {
    this.isLoading = false;
  }, 1500);
}
}
