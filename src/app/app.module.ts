import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { HomeComponent } from './home';
import { DomainComponent } from './domain';
import { EntityComponent } from './entity';
import { EntityTypeComponent } from './entity/entitytype';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DomainComponent,
    EntityComponent,
    EntityTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
