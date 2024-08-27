import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-viewmessage',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './viewmessage.component.html',
  styleUrl: './viewmessage.component.css'
})
export class ViewmessageComponent {
  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;
  currentDate = new Date();

  messages = [
    { date: 'August 9, 2024', text: 'Can you please explain the homework question?', sender: 'John Doe' },
    { date: 'August 10, 2024', text: 'Will the class start at the usual time tomorrow?', sender: 'Jane Smith' },
    { date: 'August 11, 2024', text: 'I have submitted my assignment.', sender: 'Mark Johnson' }
  ];
  
  selectedMessage: any = null;
  replyText: string = '';

  viewMessage(msg: any) {
    this.selectedMessage = msg;
    this.isModalOpen3 = true;
  }

  sendReply() {
    if (this.replyText.trim()) {
      // alert(Reply sent: ${this.replyText}\nTo: ${this.selectedMessage.sender});
      this.isModalOpen3 = false;
    } else {
      alert('Reply cannot be empty.');
    }
  }

  constructor() {
    this.currentDate = new Date(); // Initialize with the current date and time
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
    // Logic to send the message
    console.log('Message sent');
    alert("Message Sent");
    this.closeModal2();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
