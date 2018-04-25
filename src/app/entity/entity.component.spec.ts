import { TestBed, async } from '@angular/core/testing';
import { EntityComponent } from './entity.component';

describe('EntityComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EntityComponent
            ],
        }).compileComponents();
    }));

    it('should create the entity', async(() => {
        const fixture = TestBed.createComponent(EntityComponent);
        const entity = fixture.debugElement.componentInstance;
        expect(entity).toBeTruthy();
    }));

    it('should render title in a h2 tag', async(() => {
        const fixture = TestBed.createComponent(EntityComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Entities');
    }));

    it('should render subtitle in a h6 tag', async(() => {
        const fixture = TestBed.createComponent(EntityComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h6').textContent).toContain('Manage entities extracted from intents');
    }));
});
