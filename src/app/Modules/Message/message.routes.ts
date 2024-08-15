import { Routes } from '@angular/router';
import { MessagemainComponent } from './messagemain/messagemain.component';
import { ViewmessageComponent } from './viewmessage/viewmessage.component';

export const messageRoute: Routes = [
    {path: "messagemain", component: MessagemainComponent,
    children: [
        // {path: "pendingassessment", component: PendingassessmentComponent},
        {path: "viewmessage", component: ViewmessageComponent},
        {path: "", redirectTo: "viewmessage", pathMatch: "full"}
    ]
},
    // {path: "viewmessage", component: ViewmessageComponent},
    {path: "", redirectTo: "messagemain", pathMatch: "full"}
];