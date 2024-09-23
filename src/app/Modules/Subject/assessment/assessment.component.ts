import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [RouterModule ,MatCardModule, MatCardHeader],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent implements OnInit {

  subname: any
  admin_name: any

  constructor() {}

  ngOnInit(): void {
    this.subname = localStorage.getItem('subname');
    this.admin_name = localStorage.getItem('admin_name');
  }
}
