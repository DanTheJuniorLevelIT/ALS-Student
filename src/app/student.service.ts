import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}