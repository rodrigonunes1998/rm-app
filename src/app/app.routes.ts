import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { LoginComponent } from './login/login.component';
import { guardaRotaGuard } from './guarda-rota.guard';

export const routes: Routes = [
    {
        path: "characters",
        component: DashboardComponent,
        canActivate: [guardaRotaGuard]
    },
    {
        path: 'episodes',
        component: EpisodesComponent,
        canActivate: [guardaRotaGuard]
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: "/login",
        pathMatch: "full"
    }

];
