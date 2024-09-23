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
  admin_name: any;
  subname: any;
  modulecount: any;


  constructor (private studentservice: StudentService) {}

  ngOnInit(): void {
      this.cid = localStorage.getItem('classID');
      this.admin_name = localStorage.getItem('admin_name');
      this.subname = localStorage.getItem('subname');
      console.log(this.cid);
      this.getModules(this.cid);
      this.modulecount = 1;
  }

  getModules(classid:any) {
    this.studentservice.getModules(classid).subscribe((result: any) => {
      this.modules = result;
    })
  }

  getLessons(mid: any, title: any) {
    localStorage.setItem('moduleID', mid);
    localStorage.setItem('moduletitle', title);
  }
}
