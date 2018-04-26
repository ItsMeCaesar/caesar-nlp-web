import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DomainComponent } from './domain.component';

describe('DomainComponent', () => {

    let fixture: ComponentFixture<DomainComponent>;
    let component: DomainComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DomainComponent
            ],
        }).compileComponents();

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
});
