import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../student.service';

@Component({
  selector: 'app-accountinfo',
  standalone: true,
  imports: [],
  templateUrl: './accountinfo.component.html',
  styleUrl: './accountinfo.component.css'
})
export class AccountinfoComponent implements OnInit{
  learner: any;

  constructor(private studentservice: StudentService) { 
  }
  ngOnInit(): void {
    const token = localStorage.getItem('authToken'); // Retrieve Token from localStorage
  
    if (token) {
      this.studentservice.getLearnerByToken(token).subscribe({
        next: (data) => {
          this.learner = data;
          // Assuming the LRN is a property of the returned data
          
        },
        error: (err) => {
          console.error('Error fetching learner data', err);
        }
      });
    } else {
      console.error('No Token Found. User is not authenticated');
    }
  }

}
