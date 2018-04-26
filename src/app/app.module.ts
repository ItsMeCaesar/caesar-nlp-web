import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { HomeComponent } from './home';
import { DomainComponent, DomainService } from './domain';
import { EntityComponent, EntityService } from './entity';
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
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    AppService,
    DomainService,
    EntityService,
    EntityTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
