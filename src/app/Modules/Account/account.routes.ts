import { Routes } from '@angular/router';
import { AccountmainComponent } from './accountmain/accountmain.component';
import { AccountinfoComponent } from './accountinfo/accountinfo.component';

export const accountRoute: Routes = [
    {path: "accountmain", component: AccountmainComponent,
    children: [
        {path: "accountinfo", component: AccountinfoComponent},
        {path: "", redirectTo: "accountinfo", pathMatch: "full"}
    ]
},
    // {path: "accountinfo", component: AccountinfoComponent},
    {path: "", redirectTo: "accountmain", pathMatch: "full"}
];