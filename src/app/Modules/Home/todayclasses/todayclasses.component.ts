import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { StudentService } from '../../../student.service';
import { CommonModule } from '@angular/common';
import { error } from 'node:console';

@Component({
  selector: 'app-todayclasses',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './todayclasses.component.html',
  styleUrl: './todayclasses.component.css'
})
export class TodayclassesComponent implements OnInit {

  subjects: any;
  learner:any
  lrn: any
  pendingassessments: any;
  currentDayAndDate: string; // Variable that will hold the current day and date
  greeting: any;
  isLoading = false;

  constructor(private studentservice: StudentService, private route: Router) { 
    this.currentDayAndDate = this.getCurrentDayAndDate(); //Initialize the current day and date 
    this.greeting = this.getGreeting(); // Initialize the greeting
  }

  ngOnInit(): void {
    this.spinner();
  }

getSubjects() {
    if (this.lrn) {
      this.studentservice.getSubjects(this.lrn).subscribe(
        (data) => {
          this.subjects = data; // Store the retrieved subjects
          console.warn(this.subjects);
        },
        (error) => {
          console.error('Error fetching subjects', error);
        }
      );
    } else {
      console.warn('Please provide a valid LRN');
    }
}

  getCurrentDayAndDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', //Full name of the day
      year: 'numeric',
      month: 'long', // Full name of month
      day: 'numeric'
    };

    return date.toLocaleDateString(undefined, options); // Format the date string
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour >= 1 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  getPendingAssessments(lrn: any) {
    this.studentservice.getPendingAssessments(lrn).subscribe((result: any) => {
      this.pendingassessments = result;
      console.log(result);
    })
  }

  getAssessmentID(aid: any, title: any){
    localStorage.setItem('assessmentID', aid);
    localStorage.setItem('assessmenttitle', title);
  }

  getClass(subid: any, cid: any, adminname: any, sub_name: any,) {
    localStorage.setItem('subjectid', subid);
    localStorage.setItem('cid', cid);
    localStorage.setItem('adminname', adminname);
    localStorage.setItem('sub_name', sub_name);;
    // this.navigateToModules(subid);
  }

  // navigateToModules(subid: any){
  //   this.route.navigate(['/main/Subject/subjectmain/modules', subid]);
  // } 

  spinner() {
    this.isLoading = true;
    const token = localStorage.getItem('authToken'); // Retrieve Token from localStorage
  
    if (token) {
      this.studentservice.getLearnerByToken(token).subscribe({
        next: (data) => {
          this.learner = data;
          // Assuming the LRN is a property of the returned data
          const lrn = data.lrn; // Adjust this based on the structure of your data
          if (lrn) {
            localStorage.setItem('LRN', lrn); // Store the actual LRN in localStorage
            this.lrn = lrn; // Store the LRN in the component's property
            this.getSubjects(); // Call getSubjects after retrieving the LRN
            this.getPendingAssessments(lrn);
          } else {
            console.error('LRN not found in learner data');
          }
        },
        error: (err) => {
          console.error('Error fetching learner data', err);
        }
      });
    } else {
      console.error('No Token Found. User is not authenticated');
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

}
