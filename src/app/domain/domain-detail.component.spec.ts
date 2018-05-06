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

import { Domain, Intent, IntentEntity, EntityType } from '../models';

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


    it('should turn models into views', async(() => {

        component.model = new Domain('1', 'Test', 'pt_BR', [], []);
        component.entityTypeService.list.push(new EntityType('1', 'person', '#FF0000'));
        const entity1 = new IntentEntity(27, 44, 'martin lutherking', 'person');
        const intent1 = new Intent('eu ouvi sábias palavras do martin lutherking', 'conheco_pessoa', [entity1]);
        component.model.intents.push(intent1);

        component.turnModelsIntoViews();

        expect(component.intents.length).toBe(component.model.intents.length);
        expect(component.intents[0].sections[0].text).toBe('eu ouvi sábias palavras do ');
        expect(component.intents[0].sections[0].entities.length).toBe(0);
        expect(component.intents[0].sections[1].text).toBe('martin lutherking');
        expect(component.intents[0].sections[1].entities.length).toBe(1);
        expect(component.intents[0].sections[1].entities[0].type).toBe('person');
        expect(component.intents[0].sections[1].entities[0].color).toBe('#FF0000');
    }));


});
