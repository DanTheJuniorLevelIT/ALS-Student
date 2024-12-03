import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  email: string = ''
  constructor(private route: ActivatedRoute, private studentservice: StudentService, private router: Router) {}

  changePasswordForm = new FormGroup({
    password: new FormControl(null),
    password_confirmation: new FormControl(null)
  })

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email') || '';
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.studentservice.changePassword(this.changePasswordForm.value, this.email).subscribe(
        (result: any) => {
          if (result && result.message === 'Password updated successfully') {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Password Updated Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            this.changePasswordForm.reset();
            this.router.navigate(['/login']);
          } else {
            console.log('Unexpected response: ', result);
          }
        },
        (error) => {
          if (error.status === 422 && error.error?.errors?.password) {
            const errorMessage = error.error.errors.password[0];
            if(errorMessage === "The password field confirmation does not match.")
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Password Mismatch",
              text: "The password field confirmation does not match.",
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
      );
    } else {
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
