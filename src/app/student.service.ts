import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  registerLearner(learnerData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'registerLearner', learnerData);
  }

  loginLearner(learnerData:any): Observable<any> {
    return this.http.post(this.apiUrl + 'loginLearner', learnerData);
  }
  logoutLearner(learnerData:any): Observable<any> {
    return this.http.post(this.apiUrl + 'logoutLearner', learnerData);
  }

  getLearnerByToken(token:string): Observable <any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.apiUrl + 'getLearnerByToken', { headers });
  }

  getSubjects(lrn: string): Observable<any> {
    console.log("Get subjects called with LRN: " + lrn);
  
    return this.http.get(`${this.apiUrl}getSubjects?lrn=${lrn}`);
  }

  getSubjectsToday(lrn: string): Observable<any> {
    console.log("Get subjects called with LRN: " + lrn);

    return this.http.get(`${this.apiUrl}getSubjectsToday?lrn=${lrn}`);
  }

  getModules(classid: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getModules?classid=${classid}`);
  }
  getLessonID(mid: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getLessonID?lessonid=${mid}`);
  }

  getLessons(moduleID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getLessons?moduleID=${moduleID}`);
  }
  getAssessments(lessonID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getAssessments?lessonID=${lessonID}`);
  }
  getQuestions(assessmentID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getQuestions?assessmentID=${assessmentID}`);
  }
  getAssessmentProgress(lrn:any): Observable<any> {
    return this.http.get(`${this.apiUrl}getAssessmentProgress?lrn=${lrn}`);
  }
  saveAnswers(qid: any, slrn: any, answerValue: any): Observable<any> {
    const body = {
        qid: qid,
        slrn: slrn,
        answerValue: answerValue
    };
    return this.http.post(`${this.apiUrl}saveAnswers`, body);
  }

  
  
  
}