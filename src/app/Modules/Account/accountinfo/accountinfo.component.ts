import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../student.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accountinfo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './accountinfo.component.html',
  styleUrl: './accountinfo.component.css'
})
export class AccountinfoComponent implements OnInit{
  learner: any;
  lrn: any;

  updateForm = new FormGroup({
    oldpassword: new FormControl(null),
    password: new FormControl(null),
    password_confirmation: new FormControl(null)
  })
  

  constructor(private studentservice: StudentService) { 
  }
  ngOnInit(): void {
    const token = localStorage.getItem('authToken'); // Retrieve Token from localStorage
    this.lrn = localStorage.getItem('LRN');
    console.log(this.lrn);
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


  onSubmit() {
    if (this.updateForm.valid) {
      this.studentservice.updateLearnerPassword(this.updateForm.value, this.lrn).subscribe(
        (result: any) => {
          if (result && result.message === 'Password updated successfully') {
            // SweetAlert2 success message
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Password Updated Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            this.updateForm.reset();
          } else {
            // Handle unexpected response structure
            console.log('Unexpected response:', result);
          }
        },
        (error) => {
          // Handle error response from the server
          if (error.status === 400) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Old password does not match",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An error occurred",
              text: "Please try again later",
              showConfirmButton: true,
            });
          }
        }
      );
    } else {
      // Invalid form submission error message
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Invalid Form",
        text: "Please fill out all fields correctly.",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  
  

}
