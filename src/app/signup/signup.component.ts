import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import { response } from 'express';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  showPassword1 = false;
  showPassword2 = false;
  
  learnerForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    middlename: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    extension_name: new FormControl(null),
    placeofbirth: new FormControl(null, [Validators.required]),
    birthdate: new FormControl(null, [Validators.required]),
    // Address: new FormControl(null),
    education: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    civil_status: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit(): void {
      console.log('Signup Component Loaded');
  }

  constructor(private studentservice: StudentService, private route: Router ) {}

  onSubmit() {
    if (this.learnerForm.value['password'] !== this.learnerForm.value['password_confirmation']) {
      alert("Passwords do not match");
      return;
    }

    if(this.learnerForm.invalid) {
      Object.keys(this.learnerForm.controls).forEach(control => {
        this.learnerForm.get(control)?.markAllAsTouched();
      })
    } else {
      this.studentservice.registerLearner(this.learnerForm.value).subscribe(
        (response) => {
          console.log("Student registered successfully:", response);
          // alert("Student registered successfully");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registered Successfully!",
            showConfirmButton: false,
            timer: 1000
          });
          this.route.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering student', error);
          alert('An error occurred. Please Try Again.');
        }
      );
    }

  }

  togglePasswordVisibility1(): void {
    this.showPassword1 = !this.showPassword1;
  }
  togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }
}
