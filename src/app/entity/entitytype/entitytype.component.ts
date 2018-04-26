import { Component, AfterViewInit } from '@angular/core';

import { EntityTypeService } from './entitytype.service';
import { AppService } from '../../app.service';

import { EntityType, Response } from '../../models';

@Component({
    selector: 'app-entity-type',
    templateUrl: './entitytype.component.html',
    styleUrls: ['./entitytype.component.css']
})
export class EntityTypeComponent implements AfterViewInit {

    public list = new Array<EntityType>();
    public value = '';

    /**
     * Constructor
     *
     * @param service
     * @param app
     */
    constructor(
        private service: EntityTypeService,
        private app: AppService
    ) { }

    /**
     * Initialize
     */
    ngAfterViewInit() {
        this.app.loading = true;
        this.service.get((response: Response) => {
            this.app.loading = false;
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
            this.app.loading = true;
            this.service.post(this.value, (response: Response) => {
                this.app.loading = false;
                if (response.ok) {
                    this.list.push(response.obj);
                    this.value = '';
                } else {

                }
            });
        }
    }

}
