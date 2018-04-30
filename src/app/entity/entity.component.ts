import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { EntityService } from './entity.service';
import { EntityTypeService } from '../entitytype';

import { AppService } from '../app.service';
import { Entity, Locale, Response } from '../models';

@Component({
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

    public list = new Array<Entity>();

    public model = new Entity('', 'pt_BR', '', '');
    public filter = new Entity('', 'pt_BR', '', '');

    private modal: NgbModalRef;

    /**
     * Constructor
     *
     * @param service
     * @param typeService
     * @param modalService
     */
    constructor(
        private service: EntityService,
        public typeService: EntityTypeService,
        private modalService: NgbModal,
        public app: AppService
    ) { }

    /**
     * Initialize
     */
    ngOnInit() {
        this.typeService.get((resp1: Response) => {
            if (resp1.ok) {
                if (this.typeService.list.length > 0) {
                    this.filter.type = this.typeService.list[0].name;
                    this.filter.locale = this.app.locales[0].code;
                    this.callAPI();
                }
            } else {

            }
        });
    }

    /**
     * Opens the modal
     *
     * @param content
     */
    open(content) {
        this.modal = this.modalService.open(content);
        this.modal.result.then(result => {
            console.log(`Closed with: ${result}`);
        }, reason => {
            if (reason === ModalDismissReasons.ESC) {
                console.log('Dismissed by pressing ESC');
            } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
                console.log('Dismissed by clicking on a backdrop');
            } else {
                console.log(`Dismissed with: ${reason}`);
            }
        });
    }

    /**
     * Adds a new entity
     */
    add(f: NgForm) {
        if (f.valid) {
            this.app.loading = true;
            this.service.add(this.model, (response: Response) => {
                this.app.loading = false;
                if (response.ok) {
                    this.model = new Entity('', 'pt_BR', '', '');
                    this.list.push(response.obj);
                    this.modal.close();
                } else {

                }
            });
        } else {
            console.log(f + ' is not valid');
        }
    }

    /**
     * Delete an entity
     */
    delete() {
        this.app.loading = true;
        this.service.delete(this.model, (response: Response) => {
            this.app.loading = false;
            if (response.ok) {
                this.list.splice(this.list.findIndex(e => e.id === this.model.id), 1);
                this.modal.close();
            } else {

            }
        });
    }

    /**
     * Query the API
     */
    callAPI() {
        console.log('callAPI');
        this.service.get(this.filter, (resp2: Response) => {
            if (resp2.ok) {
                this.list = resp2.list;
            } else {

            }
        });
    }

    /**
     * Something change in the filter's attributes
     */
    onFilterChange() {
        this.callAPI();
    }


}
