import { Component, OnInit } from '@angular/core';

import { EntityTypeService } from './entitytype.service';
import { AppService } from '../../app.service';

import { EntityType, Response } from '../../models';

@Component({
    selector: 'app-entity-type',
    templateUrl: './entitytype.component.html',
    styleUrls: ['./entitytype.component.css']
})
export class EntityTypeComponent implements OnInit {

    public value = '';

    /**
     * Constructor
     *
     * @param service
     * @param app
     */
    constructor(
        public service: EntityTypeService,
        private app: AppService
    ) { }

    /**
     * Initialize
     */
    ngOnInit() {
        this.load();
    }

    /**
     * Adds a new entity type
     */
    add() {
        if (this.value.length > 2) {
            this.app.loading = true;
            this.service.add(this.value, (response: Response) => {
                this.app.loading = false;
                if (response.ok) {
                    this.value = '';
                } else {

                }
            });
        }
    }

    /**
     * Delete an entity type
     *
     * @param et
     */
    delete(et: EntityType) {
        this.app.loading = true;
        this.service.delete(et, (response: Response) => {
            if (!response.ok) {
                this.app.loading = false;
            }
        });
    }

    /**
     * Load the entity types
     */
    load() {
        this.service.get((response: Response) => {
            if (!response.ok) {
                this.app.loading = false;
            }
        });
    }

}
