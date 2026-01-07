import { Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { MainComponent } from './components/system/main/main.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { AccommodationListComponent } from './components/user/accommodation-list/accommodation-list.component';
import { CalendarComponent } from './components/user/calendar/calendar.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AccPageComponent } from './components/guest/acc-page/acc-page.component';
import { BookingsListComponent } from './components/admin/bookings-list/bookings-list.component';
import { AccommodationManagementComponent } from './components/admin/accommodation-management/accommodation-management.component';

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

    // accommodation
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
    {
        path: 'accroute',
        component: AccPageComponent
    },

    //admin
    {
        path: 'bookings',
        component: BookingsListComponent
    },
    {
        path: 'accommodation-management',
        component: AccommodationManagementComponent
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
