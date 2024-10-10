import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  
  learnerForm = new FormGroup({
    firstname: new FormControl(null),
    middlename: new FormControl(null),
    lastname: new FormControl(null),
    extension_name: new FormControl(null),
    placeofbirth: new FormControl(null),
    birthdate: new FormControl(null),
    // Address: new FormControl(null),
    education: new FormControl(null),
    gender: new FormControl(null),
    civil_status: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    password_confirmation: new FormControl(null),
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
