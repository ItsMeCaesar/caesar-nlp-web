import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DomainService } from './domain.service';
import { AppService } from '../app.service';

import { Domain, Intent, Response } from '../models';

@Component({
    templateUrl: './domain-detail.component.html',
    styleUrls: ['./domain-detail.component.css']
})
export class DomainDetailComponent implements OnInit {

    public model: Domain;

    /**
     * Constructor
     *
     * @param service
     * @param app
     * @param route
     * @param router
     */
    constructor(
        private service: DomainService,
        public app: AppService,
        private route: ActivatedRoute,
        private router: Router
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
     * Add a new entity or update an existing one
     */
    persist(f: NgForm) {
        if (f.valid) {
            this.app.loading = true;
            // TODO -> remove it
            this.model.intents.push(new Intent('temp', '', []));
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

}
