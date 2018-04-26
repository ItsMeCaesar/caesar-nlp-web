import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { EntityComponent } from './entity.component';
import { EntityTypeComponent, EntityTypeService } from './entitytype';

describe('EntityComponent', () => {

    let fixture: ComponentFixture<EntityComponent>;
    let component: EntityTypeComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            declarations: [
                EntityComponent,
                EntityTypeComponent
            ],
            providers: [
                EntityTypeService
            ]
        }).compileComponents();

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
});
