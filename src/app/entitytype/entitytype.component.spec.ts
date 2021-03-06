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

    beforeEach(() => {
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
    });

    it('should create the entity type', () => {
        expect(component).toBeTruthy();
    });

    it('should render title in a h4 tag', () => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h4').textContent).toContain('Entity Types');
    });

    it('should retrieve the initial types', () => {

        component.ngOnInit();

        const req = httpMock.expectOne({ method: 'GET', url: `${environment.apihost}/entitytype` });
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

        expect(req.request.method).toBe('GET');
        expect(component.service.list.length).toBe(3);
        expect(component.service.list[0].name).toBe('date');
        expect(component.service.list[1].name).toBe('person');
        expect(component.service.list[2].name).toBe('time');

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const buttons = compiled.querySelectorAll('.list-group-item');
        expect(buttons.length).toBe(3);

    });


    it('should add an entity type and delete it', () => {

        const initialLength = component.service.list.length;

        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        const initialButtons = compiled.querySelectorAll('.list-group-item').length;

        component.open('modal');
        component.value = 'date';
        component.add();

        const req1 = httpMock.expectOne({ method: 'POST', url: `${environment.apihost}/entitytype` });
        req1.flush([{
            id: '1',
            name: 'date',
            color: '#FF0000'
        }]);

        expect(req1.request.method).toBe('POST');

        const newLength = component.service.list.length;
        expect(initialLength).toBeLessThan(newLength);

        fixture.detectChanges();
        compiled = fixture.debugElement.nativeElement;
        const newButtons = compiled.querySelectorAll('.list-group-item').length;
        expect(initialButtons).toBeLessThan(newButtons);

        /* DELETE */
        const et = new EntityType('1', 'date', '#FF0000');
        component.delete(et);

        const req2 = httpMock.expectOne({ method: 'DELETE', url: `${environment.apihost}/entitytype/${et.id}` });
        expect(req2.request.method).toBe('DELETE');
        req2.flush(null);

        const deleteLength = component.service.list.length;
        expect(deleteLength).toBe(initialLength);

    });

    it('should attribtue the next color to the entity type', async(() => {

        const colors = [
            '#331832',
            '#694D75',
            '#8B9EB7',
            '#70C1B3',
            '#F1ECCE',
            '#50514F',
            '#F25F5C',
            '#FFE066',
            '#247BA0',
            '#1B5299'
        ];

        for (let i = 0; i < colors.length; i++) {

            component.open('modal');
            component.value = 'date';
            component.add();
            const req = httpMock.expectOne({ method: 'POST', url: `${environment.apihost}/entitytype` });
            req.flush([{
                id: i + '',
                name: 'date',
                color: colors[i]
            }]);
            expect(req.request.method).toBe('POST');

            httpMock.verify();
        }

        expect(component.service.list.length).toBe(colors.length);

        for (let i = 0; i < component.service.list.length; i++) {

            const et: EntityType = component.service.list[i];
            expect(JSON.stringify(et)).toContain(colors[i]);
        }

    }));

});
