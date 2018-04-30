import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { DomainComponent } from './domain';
import { EntityComponent } from './entity';
import { EntityTypeComponent } from './entitytype';

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
    }, {
        path: 'entitytype',
        component: EntityTypeComponent
    },
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
