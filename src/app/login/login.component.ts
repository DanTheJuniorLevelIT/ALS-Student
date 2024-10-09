import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private studentservice: StudentService, private route: Router) {}
  loginLearner = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });

  onSubmit() {
      if (this.loginLearner.valid) {
        this.studentservice.loginLearner(this.loginLearner.value).subscribe(
          (response: any) => {
            console.log('Response:', response);

            //Extract the token from the response
            const token = response.token;
            console.log('Token:', token);

            //Store the token in local storage (or a service if needed)
            localStorage.setItem('authToken', token);

            //Navigate to the desired page
            if(token != null) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "You are now logged in!",
                showConfirmButton: false,
                timer: 1000
              });
              this.route.navigate(['/main/Home']);
            }else{
              console.error('Invalid Login');
              alert('Invalid Login');
            }
          },
          error => {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Error Logging in",
              showConfirmButton: false,
              timer: 500
            });
            console.error('Error logging in', error);
          }
        );
      
      } else { console.error('Form is not valid'); }
  }
}
