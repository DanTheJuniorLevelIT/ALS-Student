  import { Component, OnInit } from '@angular/core';
  import { Route, Router, RouterModule } from '@angular/router';
  import { StudentService } from '../../../student.service';

  @Component({
    selector: 'app-subjecthome',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './subjecthome.component.html',
    styleUrl: './subjecthome.component.css'
  })
  export class SubjecthomeComponent implements OnInit {

    subjects:any;
    lrn: any;
    learner: any;
    currentDayAndDate: string; // Variable that will hold the current day and date

    constructor(private studentservice: StudentService, private route: Router) 
    {     this.currentDayAndDate = this.getCurrentDayAndDate(); } //Initialize the current day and date

    ngOnInit(): void {
          const token = localStorage.getItem('authToken'); // Retrieve Token from localStorage

      if (token) {
        this.studentservice.getLearnerByToken(token).subscribe({
          next: (data) => {
            this.learner = data;
            // Assuming the LRN is a property of the returned data
            const lrn = data.lrn; // Adjust this based on the structure of your data
            if (lrn) {
              this.lrn = lrn; // Store the LRN in the component's property
              console.log(this.lrn);
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
        this.studentservice.getSubjects(this.lrn).subscribe(
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


    getClassID(cid: any, admin_name: any, subname: any) {
      localStorage.setItem('classID', cid);
      localStorage.setItem('admin_name', admin_name);
      localStorage.setItem('subname', subname);
    }
    
  }
