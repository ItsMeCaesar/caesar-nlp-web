import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { DomainDetailComponent } from './domain-detail.component';
import { DomainService } from './domain.service';
import { AppService } from '../app.service';
import { EntityTypeService } from '../entitytype';

import { LocalePipe } from '../pipes';

import { environment } from '../../environments/environment';

describe('DomainDetailComponent', () => {

    let service: DomainService;
    let httpMock: HttpTestingController;
    let fixture: ComponentFixture<DomainDetailComponent>;
    let component: DomainDetailComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule,
                RouterTestingModule,
                AngularFontAwesomeModule,
                FormsModule,
                NgbModule.forRoot()
            ],
            declarations: [
                DomainDetailComponent,
                LocalePipe
            ],
            providers: [
                DomainService,
                EntityTypeService,
                AppService
            ]
        }).compileComponents();

        service = TestBed.get(DomainService);
        httpMock = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(DomainDetailComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));


});
