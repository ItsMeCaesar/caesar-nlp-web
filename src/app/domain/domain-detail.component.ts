import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DomainService } from './domain.service';
import { AppService } from '../app.service';

import { Domain, Response } from '../models';

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
     */
    constructor(
        private service: DomainService,
        public app: AppService,
        private route: ActivatedRoute
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

}
