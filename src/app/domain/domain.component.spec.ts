import { TestBed, async } from '@angular/core/testing';
import { DomainComponent } from './domain.component';

describe('DomainComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DomainComponent
            ],
        }).compileComponents();
    }));

    it('should create the domain', async(() => {
        const fixture = TestBed.createComponent(DomainComponent);
        const domain = fixture.debugElement.componentInstance;
        expect(domain).toBeTruthy();
    }));

    it('should render title in a h2 tag', async(() => {
        const fixture = TestBed.createComponent(DomainComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Domains');
    }));
    it('should render subtitle in a h6 tag', async(() => {
        const fixture = TestBed.createComponent(DomainComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h6').textContent).toContain('Manage knowledge domains');
    }));
});
