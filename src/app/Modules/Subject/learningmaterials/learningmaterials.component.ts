import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';

@Component({
  selector: 'app-learningmaterials',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatCardHeader],
  templateUrl: './learningmaterials.component.html',
  styleUrl: './learningmaterials.component.css'
})
export class LearningmaterialsComponent implements OnInit {

  cid: any;
  modules: any;

  constructor (private studentservice: StudentService) {}

  ngOnInit(): void {
      this.cid = localStorage.getItem('classID');
      console.log(this.cid);
      this.getModules(this.cid);
  }

  getModules(classid:any) {
    this.studentservice.getModules(classid).subscribe((result: any) => {
      this.modules = result;
    })
  }

  getLessons(mid: any) {
    localStorage.setItem('moduleID', mid);
  }
}
