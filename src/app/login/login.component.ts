import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private studentservice: StudentService, private route: Router) {}

  lrn:any;
  learner: any;
  showPassword = false;

  loginLearner = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    if (this.loginLearner.valid) {
      this.studentservice.loginLearner(this.loginLearner.value).subscribe(
        (response: any) => {
          console.log('Response:', response);
  
          const token = response.token;
          console.log('Token:', token);
  
          localStorage.setItem('authToken', token);
  
          if (token) {
            this.studentservice.getLearnerByToken(token).subscribe({
              next: (data) => {
                this.learner = data;
                const lrn = data.lrn; // Adjust based on your API response structure
                if (lrn) {
                  localStorage.setItem('LRN', lrn);
                  this.lrn = lrn;
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You are now logged in!",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  this.route.navigate(['/main/Home']);
                } else {
                  Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "You are not enrolled yet! (LRN Needed)",
                    showConfirmButton: false,
                    timer: 5000
                  });
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
        },
        (error) => {
          if (error.status === 401) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: error.error.message,
              showConfirmButton: false,
              timer: 3000
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "The provided credentials are incorrect",
              showConfirmButton: false,
              timer: 3000
            });
          }
          console.error('Error logging in', error);
        }
      );
    } else {
      Object.keys(this.loginLearner.controls).forEach((control) => {
        this.loginLearner.get(control)?.markAsTouched();
      });
      console.error('Form is not valid');
      return;
    }
  }
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
