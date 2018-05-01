import { Component, OnInit } from '@angular/core';

import { DomainService } from './domain.service';
import { AppService } from '../app.service';

import { Domain, Response } from '../models';

@Component({
    templateUrl: './domain.component.html',
    styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

    /**
     * Constructor
     *
     * @param service
     */
    constructor(
        public service: DomainService,
        private app: AppService
    ) { }

    /**
     * Initialize
     */
    ngOnInit() {
        this.service.get((response: Response) => {
            if (!response.ok) {

            }
        });
    }

}
