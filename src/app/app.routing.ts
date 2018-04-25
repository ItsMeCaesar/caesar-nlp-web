import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { DomainComponent } from './domain';
import { EntityComponent } from './entity';


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }, {
        path: 'domain',
        component: DomainComponent
    }, {
        path: 'entity',
        component: EntityComponent
    },
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
