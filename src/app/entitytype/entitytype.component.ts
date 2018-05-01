import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { EntityTypeService } from './entitytype.service';
import { AppService } from '../app.service';

import { EntityType, Response } from '../models';

@Component({
    templateUrl: './entitytype.component.html',
    styleUrls: ['./entitytype.component.css']
})
export class EntityTypeComponent implements OnInit {

    public value = '';
    private modal: NgbModalRef;

    /**
     * Constructor
     *
     * @param service
     * @param app
     * @param modalService
     */
    constructor(
        public service: EntityTypeService,
        private app: AppService,
        private modalService: NgbModal
    ) { }

    /**
     * Initialize
     */
    ngOnInit() {
        this.load();
    }

    /**
     * Opens the modal
     *
     * @param content
     */
    open(content) {
        this.modal = this.modalService.open(content);
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
                    this.modal.close();
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
            this.app.loading = false;
            if (!response.ok) {

            }
        });
    }

    /**
     * Load the entity types
     */
    load() {
        this.service.get((response: Response) => {
            this.app.loading = false;
            if (!response.ok) {

            }
        });
    }

}
