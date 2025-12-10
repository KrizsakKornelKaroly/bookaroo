import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { MainComponent } from './components/system/main/main.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { AccommodationListComponent } from './components/user/accommodation-list/accommodation-list.component';

export const routes: Routes = [
    // user
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },

    {
        path: 'accommodation-list',
        component: AccommodationListComponent
    },

    // general
    {
        path: '',
        component: MainComponent
    },
    {
        path: '**',
        component: NotfoundComponent
    },
];
