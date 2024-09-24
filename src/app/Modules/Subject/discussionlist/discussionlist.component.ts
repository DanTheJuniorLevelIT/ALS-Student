import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-discussionlist',
  standalone: true,
  imports: [MatCardHeader, MatCardModule, RouterModule],
  templateUrl: './discussionlist.component.html',
  styleUrl: './discussionlist.component.css'
})
export class DiscussionlistComponent implements OnInit {

  subname: any
  admin_name: any

  constructor() {}

  ngOnInit(): void {
    this.subname = localStorage.getItem('subname');
    this.admin_name = localStorage.getItem('admin_name');
  }
}
