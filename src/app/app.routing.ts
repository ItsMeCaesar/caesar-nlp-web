import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { DomainComponent, DomainDetailComponent } from './domain';
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
        path: 'domain/:id',
        component: DomainDetailComponent
    }, {
        path: 'entity',
        component: EntityComponent
    }, {
        path: 'entitytype',
        component: EntityTypeComponent
    }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
