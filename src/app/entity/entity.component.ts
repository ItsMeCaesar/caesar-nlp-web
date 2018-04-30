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
        this.typeService.get((response: Response) => {
            if (response.ok) {
                this.filter.type = this.typeService.list[0].name;
                this.filter.locale = this.app.locales[0].code;
            } else {

            }
        });

        this.list.push(new Entity('', 'pt_BR', 'a test sausan siudas daisud saiuhda', 'org'));
        this.list.push(new Entity('', 'pt_BR', 'a test sausan siudas daisud saiuhda', 'org'));
        this.list.push(new Entity('', 'pt_BR', 'a test sausan siudas daisud saiuhda', 'org'));
        this.list.push(new Entity('', 'pt_BR', 'a test sausan siudas daisud saiuhda', 'org'));
        this.list.push(new Entity('', 'pt_BR', 'a test sausan siudas daisud saiuhda', 'date'));
        this.list.push(new Entity('', 'pt_BR', 'a test sausan siudas daisud saiuhda', 'date'));
        this.list.push(new Entity('', 'pt_BR', 'a test sausan siudas daisud saiuhda', 'time'));
        this.list.push(new Entity('', 'pt_BR', 'a test sausan siudas daisud saiuhda', 'time'));
        this.list.push(new Entity('', 'pt_BR', 'a test sausan siudas daisud saiuhda', 'time'));

        // this.service.get((response: Response) => {
        //     if (response.ok) {
        //         this.list = response.list;
        //     } else {

        //     }
        // });
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

}
