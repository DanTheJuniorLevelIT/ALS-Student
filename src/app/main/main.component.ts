import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  tok:any;

  ngOnInit(): void {
      const authToken = localStorage.getItem('authToken');
      this.tok = authToken;
  }

  constructor(private studentService: StudentService, private route: Router) {}

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('show');
    }
  }

  logout(token:any) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You are now logged out!",
      showConfirmButton: false,
      timer: 1500
    });
    if(token) {
      this.studentService.logoutLearner(token).subscribe(
        (response:any) => {
          console.log(response);
          localStorage.removeItem('authToken'); //Removing token from localstorage
          this.route.navigate(['/login']); //Navigate to login
        },
        (error: any) => {
          if(error.status === 401) {
            console.error('Unauthenticated. Please login again');
            this.route.navigate(['/login']) //Redirect to login if unauthenticated
          } else {
            console.error('Error occurred while logging out', error);
          }
        }
      );
    } else {
      console.error('No token found');
    }
  }
}
