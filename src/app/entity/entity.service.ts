import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Entity, Response } from '../models';
import { environment } from '../../environments/environment';

@Injectable()
export class EntityService {

    /**
     * Constructor
     *
     * @param http
     */
    constructor(
        private http: HttpClient
    ) { }

    /**
     * Retrieve the entities
     *
     * @param callback
     */
    get(callback: Function) {

        return this.http.get<Array<Entity>>(`${environment.apihost}/entity/list`)
            .subscribe(data => {
                const out = new Response(true);
                out.list = data;
                callback(out);
            }, error => {
                const out = new Response(false);
                out.msg = error.msg;
                callback(out);
            });
    }

    /**
     * Add a new entity
     *
     * @param model
     * @param callback
     */
    add(model: Entity, callback: Function) {

        return this.http.post<Entity>(`${environment.apihost}/entity`, model)
            .subscribe(data => {
                const out = new Response(true);
                out.obj = data;
                callback(out);
            }, error => {
                const out = new Response(false);
                out.msg = error.msg;
                callback(out);
            });
    }

}
