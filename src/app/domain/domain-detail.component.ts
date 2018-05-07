import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DomainService } from './domain.service';
import { AppService } from '../app.service';
import { EntityTypeService } from '../entitytype';

import { Domain, Intent, Entity, Response } from '../models';
import { IntentView, IntentSectionView, EntityView } from './modelsviews';

@Component({
    templateUrl: './domain-detail.component.html',
    styleUrls: ['./domain-detail.component.css']
})
export class DomainDetailComponent implements OnInit {

    public model: Domain;
    public intent: Intent;
    private index: number;
    private modal: NgbModalRef;
    public intents: Array<IntentView>;

    /**
     * Constructor
     *
     * @param service
     * @param app
     * @param route
     * @param router
     * @param modalService
     * @param entityTypeService
     */
    constructor(
        private service: DomainService,
        public app: AppService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        public entityTypeService: EntityTypeService
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
                this.turnModelsIntoViews();
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
        this.intent.intent = this.intent.intent.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        this.intent.intent = this.intent.intent.split(' ').filter(str => {
            const word = str.match(/(\w+)/);
            return word && word[0].length > 3;
        }).join(' ');
        this.intent.intent = this.intent.intent.replace(/\s+/g, '_');
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

    /**
     * Retrieve the entity type background color
     *
     * @param e
     */
    getEntityTypeColor(e: Entity): string {
        const entity = this.entityTypeService.list.find(et => et.name === e.type);
        if (entity) {
            return entity.color;
        }
        return '#000000';
    }

    /**
     * Process the models in order to show user friendly views
     */
    turnModelsIntoViews() {
        this.intents = new Array<IntentView>();

        for (let i = 0, ilen = this.model.intents.length; i < ilen; i++) {

            const intent = this.model.intents[i];
            intent.entities.sort((l, r) => (l.start > r.start) ? 1 : ((l.start < r.start) ? -1 : 0));

            const fulltext = intent.text;
            const sections = new Array<IntentSectionView>();

            let index = 0;
            while (index < fulltext.length) {

                const entities1 = intent.entities.filter(e => e.start === index);
                const start = index;

                if (entities1.length === 0) {
                    const entities2 = intent.entities.filter(e => e.start > start);

                    if (entities2.length > 0) {
                        index = entities2[0].start;
                    } else {
                        index = fulltext.length;
                    }
                    const text = fulltext.substring(start, index);
                    sections.push(new IntentSectionView(text, []));
                } else {

                    const entities = new Array<EntityView>();
                    for (let j = 0, elen = intent.entities.length; j < elen; j++) {
                        const entity = intent.entities[j];
                        if (entity.start === start) {
                            const color = this.entityTypeService.list.find(et => et.name === entity.type).color;
                            entities.push(new EntityView(entity.type, color));
                        }
                    }
                    const firstEntity = entities1[0];
                    sections.push(new IntentSectionView(firstEntity.value, entities));
                    index = firstEntity.end;
                }

            }
            this.intents.push(new IntentView(sections));
        }
    }

}
