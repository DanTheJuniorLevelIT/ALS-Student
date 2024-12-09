import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';
import {MatProgressBarModule } from '@angular/material/progress-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewmessage',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, MatProgressBarModule],
  templateUrl: './viewmessage.component.html',
  styleUrl: './viewmessage.component.css'
})
export class ViewmessageComponent implements OnInit {
  isLoading: boolean = false;
  private intervalId: any;

  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;
  currentDate = new Date();
  messages: any;
  admin: any;
  selectedmessageID: any;
  isSubmitting: boolean = false;
  
  // Progress Bar
  isSending = false;
  progress = 0;


  selectedMessage: any = null;
  replyText: string = '';

  constructor(private studentservice: StudentService, private route: Router) {}

  viewMessage(msg:any) {
    this.selectedMessage = msg;
    this.selectedmessageID = msg.messageid;
    this.isModalOpen3 = true;
  }

  sendReply(adminID: any, mid:any)
  {
    this.isSubmitting = true;
    const lrn = localStorage.getItem('LRN');

    if (this.replyText.trim()) {
      const replyPayload = {
        adminID: adminID,
        messages: this.replyText,
        lrn: localStorage.getItem('LRN'), //Get sender LRN
        mid: mid
      };
      this.studentservice.sendReply(replyPayload).subscribe(
        response => {
          this.isSending = true;
          this.progress = 20;
          const interval = setInterval(() => {
            if(this.progress < 100) {
              this.progress += 20;
            } else {
              clearInterval(interval);
              this.isSending = false;
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Message sent!",
                showConfirmButton: false,
                timer: 1500
              });
              this.closeModal3();
              console.log('Reply Sent Successfully', response);
              this.replyText = ''; //Clear the reply box
            }
          }, 100)
          this.isSubmitting = false;
          this.loadMessage(lrn); //Reload Messages to shwo the updated one
        },
        error => {
          this.isSubmitting = false;
          console.error('Error sending reply:', error);
          alert('Failed to send reply.');
        }
      );
    } else {
      alert('Reply Cannot be empty.');
    }
  }

  ngOnInit(): void {
    const lrn = localStorage.getItem('LRN');
    // this.admin = localStorage.getItem('admin_name');
    // this.admin(lrn);
    this.getAdmin(lrn);

    this.spinner();

    //Set an interval to refresh messages every 30 seconds
    this.intervalId = setInterval(() => {
      this.loadMessage(lrn);
    }, 10000); // = 30 seconds
  }

  ngOnDestroy(): void {
    //Clear the interval when the component is destroyed to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  spinner() {
    this.isLoading = true; //Show the loader before the data is loaded

    //Simulate data fetching (you can replace this with an actual service)
    setTimeout(() => {
      this.isLoading = false; //Hide the loader after data is fetched
    }, 10000); // Simulated delay of 30seconds
  }

  loadMessage(id:any) {
    this.studentservice.getMessages(id).subscribe((msg:any) => {
      this.messages =msg;
      console.log(this.messages);
    })
  }

  getAdmin(id:any ) {
    this.studentservice.getAdmin(id).subscribe((ads: any) => {
      this.admin = ads;
      console.log(this.admin);
    })
  }

  onAddMessage() {
    this.isModalOpen2 = true;
  }

  closeModal2() {
    this.isModalOpen2 = false;
  }

  closeModal3() {
    this.isModalOpen3 = false;
  }

  sendMessage() {
    this.isSubmitting = true;
    const lrn = localStorage.getItem('LRN');
    const recipient = (document.getElementById('recipient') as HTMLSelectElement).value;
    const messageText = (document.getElementById('message') as HTMLTextAreaElement).value;

    // if (!recipient) {
    //   alert('Please select a recipient.');
    //   return;
    // }

    if (!messageText.trim()) {
      alert('Message cannot be empty.');
      return;
    }

    const messagePayload = {
      adminID: recipient,
      messages: messageText,
      lrn: lrn,
    };

    this.studentservice.sendMessage(messagePayload).subscribe(
      response => {
        console.log('Message sent successfully', response);
        // alert('Message sent successfully');
        
        // Progress Bar
        this.isSending = true;
        this.progress = 20;
        const interval = setInterval(() => {
          if(this.progress < 100) {
            this.progress += 20;
          } else {
            clearInterval(interval);
            this.isSending = false;
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Message sent!",
              showConfirmButton: false,
              timer: 1500
            });
            this.closeModal2();
            (document.getElementById('message') as HTMLTextAreaElement).value = '';
            this.isSubmitting = false;
          }
        }, 100)
        this.loadMessage(lrn);


      },
      error => {
        console.error('Error sending message:', error);
        alert('Failed to send message.');
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
