import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EpisodesComponent } from './episodes/episodes.component';

export const routes: Routes = [
    {
        path: "characters",
        component: DashboardComponent
    },
    {
        path: 'episodes',
        component: EpisodesComponent
    }

];
