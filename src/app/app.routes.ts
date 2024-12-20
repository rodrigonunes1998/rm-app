import { Routes } from '@angular/router';
import { CardPersonComponent } from './card-person/card-person.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "home",
        component: DashboardComponent
    },
    {
        path: "characters",
        component: CardPersonComponent
    }

];
