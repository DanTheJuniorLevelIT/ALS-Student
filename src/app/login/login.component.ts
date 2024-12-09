import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { response } from 'express';


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
      this.studentservice.loginLearner(this.loginLearner.value).subscribe({
        next: (response: any ) => {
          const token = response.token;
          console.log('Token:', token);
          localStorage.setItem('authToken', token);
          console.log('Login Successful', response)
          
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
                  }
                }
          })
        },
        error: (error) => {
          console.error('Login', error);
          if(error === 'Bad Request') {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "You are not enrolled yet! (LRN Needed)",
              showConfirmButton: false,
              timer: 1000
            });
          } else if(error === 'Unauthorized') {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "The Provided Credentials are incorrect",
              showConfirmButton: false,
              timer: 1000
            });
          }
        }
      })
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
