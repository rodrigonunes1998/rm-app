import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: "characters",
        component: DashboardComponent
    },
    {
        path: 'episodes',
        component: EpisodesComponent
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: "/login"
    }

];
