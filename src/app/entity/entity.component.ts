import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { EntityService } from './entity.service';
import { EntityTypeService } from './entitytype';

import { Entity, Response } from '../models';

@Component({
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

    public list = new Array<Entity>();
    model = 1;

    /**
     * Constructor
     *
     * @param service
     * @param typeService
     * @param modalService
     */
    constructor(
        private service: EntityService,
        private typeService: EntityTypeService,
        private modalService: NgbModal
    ) { }

    /**
     * Initialize
     */
    ngOnInit() {
        this.typeService.get((response: Response) => {
            if (!response.ok) {
            }
        });

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
        this.modalService.open(content).result.then(result => {
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

}
