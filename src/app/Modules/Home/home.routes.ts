import { Routes } from '@angular/router';
import { HomemainComponent } from './homemain/homemain.component';
import { PendingassessmentComponent } from './pendingassessment/pendingassessment.component';
import { TodayclassesComponent } from './todayclasses/todayclasses.component';

export const homeRoute: Routes = [
    {path: "homemain", component: HomemainComponent},
    {path: "pendingassessment", component: PendingassessmentComponent},
    {path: "todayclasses", component: TodayclassesComponent},
    {path: "", redirectTo: "homemain", pathMatch: "full"}
];