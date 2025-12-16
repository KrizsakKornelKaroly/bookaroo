import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { MainComponent } from './components/system/main/main.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { AccommodationListComponent } from './components/user/accommodation-list/accommodation-list.component';
import { CalendarComponent } from './components/user/calendar/calendar.component';
import { ProfileComponent } from './components/user/profile/profile.component';

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
    {
        path: 'calendar',
        component: CalendarComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
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
