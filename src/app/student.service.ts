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

  logoutLearner(token: string): Observable <any> {
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post(this.apiUrl + 'logoutLearner', {}, { headers });
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
  
}