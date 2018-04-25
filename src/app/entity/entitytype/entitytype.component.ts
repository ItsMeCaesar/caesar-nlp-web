import { Component, OnInit } from '@angular/core';

import { EntityTypeService } from './entitytype.service';

import { EntityType, Response } from '../../models';

@Component({
    selector: 'app-entity-type',
    templateUrl: './entitytype.component.html',
    styleUrls: ['./entitytype.component.css']
})
export class EntityTypeComponent implements OnInit {

    private list = new Array<EntityType>();

    /**
     * Constructor
     *
     * @param service
     */
    constructor(
        private service: EntityTypeService
    ) { }

    /**
     * Initialize
     */
    ngOnInit() {
        this.service.get((response: Response) => {
            if (response.ok) {
                this.list = response.list;
            } else {

            }
        });
    }

}
