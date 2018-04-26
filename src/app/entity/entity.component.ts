import { Component, OnInit } from '@angular/core';

import { EntityService } from './entity.service';

import { Entity, Response } from '../models';

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

  public list = new Array<Entity>();

    /**
     * Constructor
     *
     * @param service
     */
    constructor(
        private service: EntityService
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
