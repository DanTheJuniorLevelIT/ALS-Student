import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../student.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import bootstrap from '../../../../main.server';
import { MatProgressBarModule} from '@angular/material/progress-bar'
import { ProfileserviceService } from '../../../profileservice.service';

@Component({
  selector: 'app-accountinfo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatProgressBarModule],
  templateUrl: './accountinfo.component.html',
  styleUrl: './accountinfo.component.css'
})
export class AccountinfoComponent implements OnInit{
  learner: any;
  studentpic: any;
  lrn: any;
  selectedFile: File | null = null;
  profilePicOfStudent: { image?: string } = {}; // Ensure profilePicOfStudent is initialized
  profilePic: any; // Ensure profilePicOfStudent is initialized
  progress = 0;
  isUploading = false;


  updateForm = new FormGroup({
    oldpassword: new FormControl(null),
    password: new FormControl(null),
    password_confirmation: new FormControl(null)
  })
  

  constructor(private studentservice: StudentService, private profileservice: ProfileserviceService) { 
    
  }


  ngOnInit(): void {
    const token = localStorage.getItem('authToken'); // Retrieve Token from localStorage
    this.lrn = localStorage.getItem('LRN');
    console.log(this.lrn);
    this.getLearnerInfo(this.lrn);
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

  onFileSelect(event:any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        // Once the file is read, set the preview URL to 'profilePic'
        reader.onload = (e: ProgressEvent<FileReader>) => {
            this.profilePic = e.target?.result; // This will set the profilePic to the file URL
        };

        reader.readAsDataURL(file); // Read file as data URL for preview
    }
  }

  uploadProfilePicture() {
    if(!this.selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData  = new FormData();
    formData.append('profile_picture', this.selectedFile);
    formData.append('lrn', this.lrn);

    this.studentservice.uploadProfilePicture(formData).subscribe((result: any) => {
      const newImageUrl = `http://localhost:8000/assets/profile_pictures/${result.image_name}`;
      console.log(result);
      this.isUploading = true;
      this.progress = 20;

      const interval = setInterval(() => {
        if(this.progress < 100) {
          this.progress += 20;
        } else {
          clearInterval(interval);
          this.isUploading = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Profile Picture Uploaded Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.profileservice.updateProfilePic(newImageUrl);
        }
      }, 100);
      // Update the learner's image path to point to the Laravel assets folder
      // this.profilePicOfStudent.image = `http://localhost:8000/assets/profile_pictures/${result.image_name}`;
      // console.log(this.profilePicOfStudent);
      this.getLearnerInfo(this.lrn);
    })
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

  getLearnerInfo(lrn: string): void {
    this.studentservice.getLearner(lrn).subscribe(
      (data: any) => {
        this.learner = data.learner;
        // Check if the learner has a profile picture, else use icon.jpg
        if (data.image) {
          this.profilePic = `http://localhost:8000/assets/profile_pictures/${data.image}`;
        } else {
          this.profilePic = 'assets/icon.jpg'; // Fallback to default icon
        }
      },
      (error) => {
        console.error('Error fetching learner data', error);
      }
    );
  }
  

  
  

}
