import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessmentfinish',
  standalone: true,
  imports: [],
  templateUrl: './assessmentfinish.component.html',
  styleUrl: './assessmentfinish.component.css'
})
export class AssessmentfinishComponent implements OnInit{
  constructor(
    private route: Router
    
    ){}
  ngOnInit(): void {
  }

  review(){
    this.route.navigate(['/main/Subject/subjectmain/modules/questionnaires'])
  }
}
