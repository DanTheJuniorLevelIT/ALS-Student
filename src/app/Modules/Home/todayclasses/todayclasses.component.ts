import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  currentDayAndDate: string; // Variable that will hold the current day and date

  constructor(private studentservice: StudentService) { 
    this.currentDayAndDate = this.getCurrentDayAndDate(); //Initialize the current day and date 
  }

  ngOnInit(): void {
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
}

getSubjects() {
    if (this.lrn) {
      this.studentservice.getSubjectsToday(this.lrn).subscribe(
        (data) => {
          this.subjects = data; // Store the retrieved subjects
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

}
