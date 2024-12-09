import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../student.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  aid: any;
  lrn: any;
  result: any;
  score: any;

  constructor(private route: ActivatedRoute, private studentservice: StudentService) {}

  ngOnInit(): void {
    this.lrn = localStorage.getItem('LRN');
    this.route.paramMap.subscribe(params => {
      this.aid = params.get('aid');
      console.log('Assessment ID:', this.aid);
    });

    this.getResultAnalysis(this.aid, this.lrn);
  }

  getResultAnalysis(aid:any, lrn: any) {
    this.studentservice.getResultAnalysis(aid, lrn).subscribe((result: any) => {
      this.result = result;
      // this.score = result.totalpoints;
      console.log(this.result);
    })
  }
}
