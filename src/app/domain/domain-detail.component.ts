import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DomainService } from './domain.service';
import { AppService } from '../app.service';

import { Domain, Intent, Response } from '../models';

@Component({
    templateUrl: './domain-detail.component.html',
    styleUrls: ['./domain-detail.component.css']
})
export class DomainDetailComponent implements OnInit {

    public model: Domain;
    public intent: Intent;
    private index: number;
    private modal: NgbModalRef;

    /**
     * Constructor
     *
     * @param service
     * @param app
     * @param route
     * @param router
     * @param modalService
     */
    constructor(
        private service: DomainService,
        public app: AppService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
    ) { }

    /**
     * Initialize
     */
    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id === 'new') {
                this.model = new Domain('', '', '', [], []);
            } else {
                this.model = this.service.getByID(id);
            }
        });
    }

    /**
     * Opens the modal
     *
     * @param content
     * @param i
     */
    open(content, index: number) {
        this.index = index;
        if (index === -1) {
            this.intent = new Intent('', '', []);
        } else {
            this.intent = Object.assign({}, this.model.intents[index]);
        }
        this.modal = this.modalService.open(content);
    }

    /**
     * Add a new entity or update an existing one
     */
    persist(f: NgForm) {
        if (f.valid) {
            this.app.loading = true;
            this.service.persist(this.model, (response: Response) => {
                this.app.loading = false;
                if (response.ok) {
                    this.router.navigate(['domain']);
                } else {

                }
            });
        } else {
            console.log(f + ' is not valid');
        }
    }

    /**
     * Delete a domain
     */
    delete() {
        this.app.loading = true;
        this.service.delete(this.model, (response: Response) => {
            this.app.loading = false;
            if (response.ok) {
                this.service.list.splice(this.service.list.findIndex(e => e.id === this.model.id), 1);
                this.router.navigate(['domain']);
            } else {

            }
        });
    }

    /**
     * Delete an intent
     */
    deleteIntent() {
        this.model.intents.splice(this.index, 1);
        this.modal.close();
    }

    /**
     * Transform the intent identifier to the standard format
     */
    formatIntent() {
        this.intent.intent = this.intent.intent.trim().toLowerCase();
        this.intent.intent = this.intent.intent.replace(/\s+/g, '_');
        this.intent.intent = this.intent.intent.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    /**
     * Save an intent to the list
     * @param f
     */
    saveIntent(f: NgForm) {
        this.formatIntent();
        this.intent.text = this.intent.text.toLowerCase();
        const intentcp = Object.assign({}, this.intent);
        if (this.index === -1) {
            this.model.intents.push(intentcp);
        } else {
            this.model.intents[this.index] = intentcp;
        }
        this.modal.close();
    }

}
