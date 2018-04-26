import { Component, AfterViewInit } from '@angular/core';

import { EntityService } from './entity.service';

import { Entity, Response } from '../models';

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements AfterViewInit {

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
    ngAfterViewInit() {
        this.service.get((response: Response) => {
            if (response.ok) {
                this.list = response.list;
            } else {

            }
        });
    }

}
