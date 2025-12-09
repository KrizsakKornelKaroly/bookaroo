import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { MainComponent } from './components/system/main/main.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },


    {
        path: '**',
        component: NotfoundComponent
    },
];
