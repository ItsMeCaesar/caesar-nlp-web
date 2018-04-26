import { Component, OnInit } from '@angular/core';

import { EntityTypeService } from './entitytype.service';

import { EntityType, Response } from '../../models';

@Component({
    selector: 'app-entity-type',
    templateUrl: './entitytype.component.html',
    styleUrls: ['./entitytype.component.css']
})
export class EntityTypeComponent implements OnInit {

    public list = new Array<EntityType>();
    public value = '';

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

    /**
     * Adds a new entity type
     */
    add() {
        if (this.value.length > 2) {
            this.service.post(this.value, (response: Response) => {
                if (response.ok) {
                    this.list.push(response.obj);
                    this.value = '';
                } else {

                }
            });
        }
    }

}
