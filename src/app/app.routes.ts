import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { homeRoute } from './Modules/Home/home.routes';
import { subjectRoute } from './Modules/Subject/subject.routes';
import { messageRoute } from './Modules/Message/message.routes';
import { accountRoute } from './Modules/Account/account.routes';
import { SignupComponent } from './signup/signup.component';
import { authGuardGuard } from './auth-guard.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'main', component: MainComponent, canActivate: [authGuardGuard], //Protect main route
        children: [
            {
                path: 'Home',
                loadChildren: () => import('./Modules/Home/home.routes').then(r=>homeRoute),
                canActivate: [authGuardGuard] //Protect Home Route
            },
            {
                path: 'Subject',
                loadChildren: () => import('./Modules/Subject/subject.routes').then(r=>subjectRoute),
                canActivate: [authGuardGuard] //Protect Subject Route
            },
            {
                path: 'Message',
                loadChildren: () => import('./Modules/Message/message.routes').then(r=>messageRoute),
                canActivate: [authGuardGuard] //Protect Message Route
            },
            {
                path: 'Account',
                loadChildren: () => import('./Modules/Account/account.routes').then(r=>accountRoute),
                canActivate: [authGuardGuard] // Protect Account Route
            },
            {path: '', redirectTo: 'Home', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'}
]