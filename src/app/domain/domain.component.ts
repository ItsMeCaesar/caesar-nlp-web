import { Component, OnInit } from '@angular/core';

import { DomainService } from './domain.service';
import { AppService } from '../app.service';
import { EntityTypeService } from '../entitytype';

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
     * @param app
     * @param entityTypeService
     */
    constructor(
        public service: DomainService,
        private app: AppService,
        private entityTypeService: EntityTypeService
    ) { }

    /**
     * Initialize
     */
    ngOnInit() {
        this.service.get((response1: Response) => {
            if (response1.ok) {
                this.entityTypeService.get((response2: Response) => {
                    if (!response2.ok) {

                    }
                });
            } else {

            }
        });
    }

}
