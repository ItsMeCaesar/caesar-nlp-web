import { TestBed, async } from '@angular/core/testing';

import { HttpModule } from '@angular/http';

import { EntityTypeComponent } from './entitytype.component';
import { EntityTypeService } from './entitytype.service';

describe('EntityComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            declarations: [
                EntityTypeComponent
            ],
            providers: [
                EntityTypeService
            ]
        }).compileComponents();
    }));

    it('should create the entity type', async(() => {
        const fixture = TestBed.createComponent(EntityTypeComponent);
        const entitytype = fixture.debugElement.componentInstance;
        expect(entitytype).toBeTruthy();
    }));

    it('should render title in a h5 tag', async(() => {
        const fixture = TestBed.createComponent(EntityTypeComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h5').textContent).toContain('Entities Types');
    }));

    // it('should render subtitle in a h6 tag', async(() => {
    //     const fixture = TestBed.createComponent(EntityTypeComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h6').textContent).toContain('Manage entities extracted from intents');
    // }));
});
