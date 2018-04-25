import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { EntityType, Response } from '../../models';


@Injectable()
export class EntityTypeService {

    /**
     * Constructor
     *
     * @param http
     */
    constructor(
        private http: Http
    ) { }

    /**
     * Retrieve the entity types
     *
     * @param callback
     */
    get(callback: Function) {

        return this.http.get('http://localhost:8080/caesar-nlp/entitytype')
            .subscribe(data => {
                const json = data.json();

                const list = new Array<EntityType>();
                const out = new Response(true);

                json.forEach(vo => list.push(new EntityType(vo.id, vo.name)));

                out.list = list;
                callback(out);
            }, error => {
                const out = new Response(false);
                out.msg = error.json() && error.json().msg;
                callback(out);
            });
    }



}
