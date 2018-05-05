import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { EntityComponent } from './entity.component';
import { EntityService } from './entity.service';
import { EntityTypeComponent, EntityTypeService } from '../entitytype';
import { AppService } from '../app.service';

import { LocalePipe } from '../pipes';

import { Entity } from '../models';

import { environment } from '../../environments/environment';

describe('EntityComponent', () => {

    let service: EntityService;
    let httpMock: HttpTestingController;
    let fixture: ComponentFixture<EntityComponent>;
    let component: EntityComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule,
                FormsModule,
                NgbModule.forRoot(),
                AngularFontAwesomeModule
            ],
            declarations: [
                EntityComponent,
                EntityTypeComponent,
                LocalePipe
            ],
            providers: [
                AppService,
                EntityTypeService,
                EntityService
            ]
        }).compileComponents();

        service = TestBed.get(EntityService);
        httpMock = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(EntityComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should render title in a h4 tag', async(() => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h4').textContent).toContain('Entities');
    }));

    it('should render subtitle in a h6 tag', async(() => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h6').textContent).toContain('Manage entities extracted from intents');
    }));


    it('should retrieve the initial entities', async(() => {

        const filter = new Entity('', 'pt_BR', '', 'person');
        component.filter = filter;

        component.callAPI();

        const url = `${environment.apihost}/entity/list?locale=${filter.locale}&type=${filter.type}&value=${filter.value}`;

        const req = httpMock.expectOne(url, 'call to api');
        req.flush([{
            id: '1',
            value: 'michel temer',
            locale: 'pt_BR',
            type: 'person'
        }, {
            id: '2',
            value: 'carmen lúcia',
            locale: 'pt_BR',
            type: 'person'
        }]);
        httpMock.verify();

        expect(req.request.method).toBe('GET');
        expect(component.list.length).toBe(2);

        expect(component.list[0].locale).toBe('pt_BR');
        expect(component.list[0].value).toBe('michel temer');
        expect(component.list[0].type).toBe('person');

        expect(component.list[1].locale).toBe('pt_BR');
        expect(component.list[1].value).toBe('carmen lúcia');
        expect(component.list[1].type).toBe('person');

    }));


    it('should update on filter change', async(() => {

        const filter = new Entity('', 'pt_BR', '', 'person');
        component.filter = filter;

        component.onFilterChange();

        const url = `${environment.apihost}/entity/list?locale=${filter.locale}&type=${filter.type}&value=${filter.value}`;

        const req = httpMock.expectOne(url, 'call to api');
        req.flush([{
            id: '1',
            value: 'michel temer',
            locale: 'pt_BR',
            type: 'person'
        }, {
            id: '2',
            value: 'carmen lúcia',
            locale: 'pt_BR',
            type: 'person'
        }]);
        httpMock.verify();

        expect(req.request.method).toBe('GET');
        expect(component.list.length).toBe(2);

        expect(component.list[0].locale).toBe('pt_BR');
        expect(component.list[0].value).toBe('michel temer');
        expect(component.list[0].type).toBe('person');

        expect(component.list[1].locale).toBe('pt_BR');
        expect(component.list[1].value).toBe('carmen lúcia');
        expect(component.list[1].type).toBe('person');

    }));
});
