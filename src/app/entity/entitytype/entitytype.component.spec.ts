import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';

import { EntityTypeComponent } from './entitytype.component';
import { EntityTypeService } from './entitytype.service';

import { Response, EntityType } from '../../models';

import { environment } from '../../../environments/environment';

describe('EntityTypeComponent', () => {

    let service: EntityTypeService;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                EntityTypeComponent
            ],
            providers: [
                EntityTypeService
            ]
        }).compileComponents();

        service = TestBed.get(EntityTypeService);
        httpMock = TestBed.get(HttpTestingController);
    }));

    it('should create the entity type', async(() => {
        const fixture = TestBed.createComponent(EntityTypeComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));

    it('should render title in a h5 tag', async(() => {
        const fixture = TestBed.createComponent(EntityTypeComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h5').textContent).toContain('Entities Types');
    }));

    it('should retrieve the initial types', async(() => {

        service.get((response: Response) => {

            expect(response.ok).toBeTruthy();

            const list: Array<EntityType> = response.list;

            expect(list.length).toBe(3);
            expect(list[0].name).toBe('date');
            expect(list[1].name).toBe('person');
            expect(list[2].name).toBe('time');

        });

        const req = httpMock.expectOne(`${environment}/entitytype`, 'call to api');
        expect(req.request.method).toBe('GET');
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

    }));

    it('should display values on the UI', async(() => {

        const fixture = TestBed.createComponent(EntityTypeComponent);
        const compiled = fixture.debugElement.nativeElement;
        const component = fixture.debugElement.componentInstance;

        component.list = [
            new EntityType('1', 'date'),
            new EntityType('2', 'person'),
            new EntityType('3', 'time'),
        ];

        fixture.detectChanges();

        const buttons = compiled.querySelectorAll('.list-group-item');
        expect(buttons.length).toBe(3);
    }));
});
