import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EntityTypeComponent } from './entitytype.component';
import { EntityTypeService } from './entitytype.service';
import { AppService } from '../app.service';

import { Response, EntityType } from '../models';

import { environment } from '../../environments/environment';

describe('EntityTypeComponent', () => {

    let service: EntityTypeService;
    let httpMock: HttpTestingController;
    let fixture: ComponentFixture<EntityTypeComponent>;
    let component: EntityTypeComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                FormsModule,
                NgbModule.forRoot()
            ],
            declarations: [
                EntityTypeComponent
            ],
            providers: [
                AppService,
                EntityTypeService
            ]
        }).compileComponents();

        service = TestBed.get(EntityTypeService);
        httpMock = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(EntityTypeComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create the entity type', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should retrieve the initial types', async(() => {

        component.ngOnInit();

        const req = httpMock.expectOne(`${environment.apihost}/entitytype`, 'call to api');
        req.flush([{
            id: '1',
            name: 'date'
        }, {
            id: '2',
            name: 'person'
        }, {
            id: '3',
            name: 'time'
        }]);
        httpMock.verify();

        expect(req.request.method).toBe('GET');
        expect(component.service.list.length).toBe(3);
        expect(component.service.list[0].name).toBe('date');
        expect(component.service.list[1].name).toBe('person');
        expect(component.service.list[2].name).toBe('time');

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const buttons = compiled.querySelectorAll('.list-group-item');
        expect(buttons.length).toBe(3);

    }));

});
