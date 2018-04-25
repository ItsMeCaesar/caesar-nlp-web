import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { HomeComponent } from './home';
import { DomainComponent, DomainService } from './domain';
import { EntityComponent } from './entity';
import { EntityTypeComponent, EntityTypeService } from './entity/entitytype';

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
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    EntityTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
