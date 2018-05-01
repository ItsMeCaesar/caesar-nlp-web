import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Entity, Response } from '../models';
import { environment } from '../../environments/environment';

import { AppService } from '../app.service';

@Injectable()
export class EntityService {

    /**
     * Constructor
     *
     * @param http
     * @param app
     */
    constructor(
        private http: HttpClient,
        private app: AppService
    ) { }

    /**
     * Retrieve the entities
     *
     * @param callback
     */
    get(filter: Entity, callback: Function) {

        const url = `${environment.apihost}/entity/list?locale=${filter.locale}&type=${filter.type}&value=${filter.value}`;
        return this.http.get<Array<Entity>>(url)
            .subscribe(data => {
                const out = new Response(true);
                out.list = data;
                callback(out);
            }, error => this.app.handleError(error, callback));
    }

    /**
     * Add a new entity or update an existing one
     *
     * @param model
     * @param callback
     */
    persist(model: Entity, callback: Function) {

        if (model.id === '') {
            return this.http.post<Entity>(`${environment.apihost}/entity`, model)
                .subscribe(data => {
                    const out = new Response(true);
                    out.obj = data;
                    callback(out);
                }, error => this.app.handleError(error, callback));
        } else {
            return this.http.put<Entity>(`${environment.apihost}/entity`, model)
                .subscribe(data => {
                    const out = new Response(true);
                    out.obj = data;
                    callback(out);
                }, error => this.app.handleError(error, callback));
        }
    }

    /**
     * Delete an entity
     *
     * @param model
     * @param callback
     */
    delete(model: Entity, callback: Function) {

        return this.http.delete<Entity>(`${environment.apihost}/entity/${model.id}`)
            .subscribe(data => {
                callback(new Response(true));
            }, error => this.app.handleError(error, callback));
    }

}
