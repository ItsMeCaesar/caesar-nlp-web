import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { DomainComponent } from './domain.component';
import { DomainService } from './domain.service';
import { AppService } from '../app.service';

import { LocalePipe } from '../pipes';

import { environment } from '../../environments/environment';

describe('DomainComponent', () => {

    let service: DomainService;
    let httpMock: HttpTestingController;
    let fixture: ComponentFixture<DomainComponent>;
    let component: DomainComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule,
                RouterTestingModule,
                AngularFontAwesomeModule
            ],
            declarations: [
                DomainComponent,
                LocalePipe
            ],
            providers: [
                DomainService,
                AppService
            ]
        }).compileComponents();

        service = TestBed.get(DomainService);
        httpMock = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(DomainComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should render title in a h2 tag', async(() => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Domains');
    }));

    it('should render subtitle in a h6 tag', async(() => {

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h6').textContent).toContain('Manage knowledge domains');
    }));

    /**
     * API Mockup
     */
    it('should retrieve the initial entities', async(() => {

        component.ngOnInit();

        const req = httpMock.expectOne(`${environment.apihost}/domain/list`, 'call to api');
        req.flush([
            {
                id: '',
                name: 'Global',
                locale: 'pt_BR',
                entitySynonyms: [
                    {
                        value: 'papai noel',
                        synonyms: [
                            'bom velhinho',
                            'são nicolau'
                        ]
                    }
                ],
                intents: [
                    {
                        text: 'oi',
                        intent: 'greet',
                        entities: []
                    },
                    {
                        text: 'bom dia',
                        intent: 'greet',
                        entities: []
                    },
                    {
                        text: 'boa tarde',
                        intent: 'greet',
                        entities: []
                    },
                    {
                        text: 'boa noite',
                        intent: 'greet',
                        entities: []
                    },
                    {
                        text: 'olá',
                        intent: 'greet',
                        entities: []
                    },
                    {
                        text: 'ok',
                        intent: 'affirm',
                        entities: []
                    },
                    {
                        text: 'entendi',
                        intent: 'affirm',
                        entities: []
                    },
                    {
                        text: 'ok, obrigado',
                        intent: 'affirm',
                        entities: []
                    },
                    {
                        text: 'tchau',
                        intent: 'goodbye',
                        entities: []
                    },
                    {
                        text: 'adeus',
                        intent: 'goodbye',
                        entities: []
                    },
                    {
                        text: 'até mais',
                        intent: 'goodbye',
                        entities: []
                    },
                    {
                        text: 'peço por você mesmo?',
                        intent: 'ask_for_me',
                        entities: []
                    },
                    {
                        text: 'procuro você?',
                        intent: 'ask_for_me',
                        entities: []
                    },
                    {
                        text: 'estou com um problema, pode me ajudar?',
                        intent: 'ask_for_help',
                        entities: []
                    },
                    {
                        text: 'papai noel existe?',
                        intent: 'ask_for_santa',
                        entities: [
                            {
                                start: 0,
                                end: 10,
                                value: 'papai noel',
                                type: 'misc'
                            }
                        ]
                    }
                ]
            }
        ]);

        expect(req.request.method).toBe('GET');
        expect(component.service.list.length).toBe(1);

        expect(component.service.list[0].locale).toBe('pt_BR');
        expect(component.service.list[0].name).toBe('Global');
        expect(component.service.list[0].intents.length).toBe(15);
        expect(component.service.list[0].intents[14].entities.length).toBe(1);
        expect(component.service.list[0].entitySynonyms.length).toBe(1);

    }));
});
