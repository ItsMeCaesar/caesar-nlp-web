import { TestBed, async } from '@angular/core/testing';

import { LocalePipe } from './locale.pipe';

describe('LocalePipe', () => {

    let pipe: LocalePipe;

    beforeEach(async(() => {
        pipe = new LocalePipe();
    }));

    it('should create the pipe', async(() => {
        expect(pipe).toBeTruthy();
    }));

    it('should convert pt_BR', async(() => {

        const description = pipe.transform('pt_BR');
        expect(description).toContain('Português (BR)');
    }));

    it('should convert en_US', async(() => {

        const description = pipe.transform('en_US');
        expect(description).toContain('English (US)');
    }));

});
