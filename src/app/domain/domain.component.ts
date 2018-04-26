import { Component, OnInit } from '@angular/core';

import { DomainService } from './domain.service';

import { Domain, Response } from '../models';

@Component({
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  public list = new Array<Domain>();

    /**
     * Constructor
     *
     * @param service
     */
    constructor(
        private service: DomainService
    ) { }

    /**
     * Initialize
     */
    ngOnInit() {
        this.service.get((response: Response) => {
            if (response.ok) {
                this.list = response.list;
            } else {

            }
        });
    }

}
