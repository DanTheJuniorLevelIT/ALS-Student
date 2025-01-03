import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api/';
  // private apiUrl = 'http://192.168.1.138:8000/api/';

  constructor(private http: HttpClient) {
   }

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
    
    return this.http.get(`${this.apiUrl}getSubjects/${lrn}`);
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
  getAssessments(lessonID: any, slrn: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getAssessments?lessonID=${lessonID}&lrn=${slrn}`);
  }

  getQuestions(assessmentID: any, slrn: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getQuestions?assessmentID=${assessmentID}&lrn=${slrn}`);
  }
  getAnswers(questionID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getAnswers?questionID=${questionID}`);
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
    
  saveAssessmentsAnswer(assessmentID: any, lrn: any): Observable<any> {
    const body = {
      assessmentID: assessmentID,
      lrn: lrn
    };
    return this.http.post(this.apiUrl + 'saveAssessmentsAnswer', body);
  }
    
  getPendingAssessments(lrn: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getPendingAssessments?lrn=${lrn}`);
  }
  
  updateLearnerPassword(pdata: any, lrn: any) {
    return this.http.post(`${this.apiUrl}updateLearnerPassword/${lrn}`, pdata);
  }

  uploadProfilePicture(formData:any) {
    return this.http.post(`${this.apiUrl}updateProfilePicture`, formData);
  }
  uploadFile(formData:any) {
    return this.http.post(`${this.apiUrl}updateFile`, formData);
  }

  getLearner(lrn: any) {
    return this.http.get(`${this.apiUrl}getLearner/${lrn}`);
  }
  getAnswerFile(lrn: any, aid:any) {
    // return this.http.get(`${this.apiUrl}getAnswerFile/${lrn}`);
    return this.http.get(`${this.apiUrl}getAnswerFile?aid=${aid}&lrn=${lrn}`)
  }
  // updateProfilePic(newPicUrl: string): void {
  //   this.profilePicSource.next(newPicUrl);
  // }

  // uploadFile(lrn: any, assessmentID: any, file: File): Observable<any>{
  //   const formData = new FormData();
  //   formData.append('lrn', lrn);
  //   formData.append('assessmentid', assessmentID);
  //   formData.append('file', file);

  //   return this.http.post(`${this.apiUrl}uploadFile`, formData);}

  getDiscussions(lid: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getDiscussions?lessonid=${lid}`)
  }
    
  viewDiscussionReplies(discussionid: any) {
    return this.http.get(`${this.apiUrl}discussionReplies/${discussionid}`);
  }

  sendDiscussionReplies(data: any) {
    return this.http.post(`${this.apiUrl}discussionReply`, data);
  }

  checkProgress(cid: any, lrn: any) {
    return this.http.get(`${this.apiUrl}checkProgress?cid=${cid}&lrn=${lrn}`);
  }
  getScore(aid: any, lrn: any) {
    return this.http.get(`${this.apiUrl}getScore?aid=${aid}&lrn=${lrn}`);
  }
  getFile(aid: any, lrn: any) {
    return this.http.get(`${this.apiUrl}getFile?aid=${aid}&lrn=${lrn}`);
  }
  getAnnouncements(cid: any) {
    return this.http.get(`${this.apiUrl}getAnnouncements?cid=${cid}`);
  }

  getMessages(id:any) {
    // const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.apiUrl}messages/${id}`);
  }

  getAdmin(id: any) {
    return this.http.get(`${this.apiUrl}admins/${id}`);
  }

  sendReply(data: any) {
    return this.http.post(`${this.apiUrl}messages/reply`, data);
  }

  sendMessage(data: any) {
    return this.http.post(`${this.apiUrl}messages/compose`, data);
  }

  requestChangePassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}request-change-password`, {email})
  }

  getPasswordChangeRequestStatus(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}get-password-change-status`, { email });
  }

  changePassword(pdata: any, email: any): Observable<any> {
    return this.http.post(`${this.apiUrl}change-password/${email}`, pdata);
  }

  getResultAnalysis(aid: any, lrn: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getResultAnalysis?aid=${aid}&lrn=${lrn}`);
  }

  getmoduleID(aid: any): Observable<any> {
    return this.http.get(`${this.apiUrl}getmoduleID?aid=${aid}`);
  }
}