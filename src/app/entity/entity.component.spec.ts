import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EntityComponent } from './entity.component';
import { EntityService } from './entity.service';
import { EntityTypeComponent, EntityTypeService } from './entitytype';
import { AppService } from '../app.service';

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
                FormsModule
            ],
            declarations: [
                EntityComponent,
                EntityTypeComponent
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

    it('should render title in a h2 tag', async(() => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Entities');
    }));

    it('should render subtitle in a h6 tag', async(() => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h6').textContent).toContain('Manage entities extracted from intents');
    }));

    it('should retrieve the initial entities', async(() => {

        component.ngAfterViewInit();

        const req = httpMock.expectOne(`${environment.apihost}/entity/list`, 'call to api');
        req.flush([{
            id: '1',
            value: 'michel temer',
            locale: 'pt_BR',
            type: 'person'
        }, {
            id: '2',
            value: 'donald trump',
            locale: 'en_US',
            type: 'person'
        }]);
        httpMock.verify();

        expect(req.request.method).toBe('GET');
        expect(component.list.length).toBe(2);

        expect(component.list[0].locale).toBe('pt_BR');
        expect(component.list[0].value).toBe('michel temer');
        expect(component.list[0].type).toBe('person');

        expect(component.list[1].locale).toBe('en_US');
        expect(component.list[1].value).toBe('donald trump');
        expect(component.list[1].type).toBe('person');

    }));
});
