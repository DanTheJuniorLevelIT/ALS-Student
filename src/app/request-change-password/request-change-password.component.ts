import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../student.service';
import { error } from 'console';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './request-change-password.component.html',
  styleUrl: './request-change-password.component.css'
})
export class RequestChangePasswordComponent implements OnInit {
  email: string = ''
  status: any;
  isLoading = false;
  canProceed = false;
  // private statusPollSubscription: Subscription | null = null;
  private statusPollInterval: any;

  constructor(private studentservice: StudentService, private route: Router) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Ensure the interval is cleared when the component is destroyed
    if (this.statusPollInterval) {
      clearInterval(this.statusPollInterval);
    }
  }

  onSubmit() {
    // Start loading indicator
    this.isLoading = true;

    // First, submit the password change request
    this.studentservice.requestChangePassword(this.email).subscribe(
      (response: any) => {
        console.log('Password change request submitted: ', response);
        alert(response.message);

        // After the request is submitted, start polling for status
        this.pollStatus();

        // Initially set the canProceed to false, will be updated by the status check
        this.canProceed = false;
      },
      (error: any) => {
        console.log('Error submitting request:', error);
        alert('Failed to submit');
        this.isLoading = false;
      }
    );
  }

  pollStatus() {
    // Store the interval ID to clear it later
    this.statusPollInterval = setInterval(() => {
      this.studentservice.getPasswordChangeRequestStatus(this.email).subscribe(
        (statusResponse: any) => {
          console.log('Polling: Password change request status:', statusResponse);
          this.status = statusResponse.password_change_request;

          // If status is 2, enable the button to proceed to change password
          if (this.status === 2) {
            this.canProceed = true;
            this.isLoading = false; // Stop loading once the status is updated
            clearInterval(this.statusPollInterval); // Stop polling once we get status 2
          }
        },
        (error) => {
          console.log('Error fetching status:', error);
          alert('Failed to fetch password change status');
          this.isLoading = false;
        }
      );
    }, 5000); // Poll every 5 seconds
  }

  proceedToChangePassword() {
    // You can navigate to the change password form here
    // For example, using the Angular Router:
    // this.router.navigate(['/change-password']);
    // alert('Proceeding to change password...');
    this.route.navigate(['/change-password', this.email])
  }
}
