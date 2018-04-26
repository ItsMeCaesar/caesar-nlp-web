import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityType, Response } from '../../models';
import { environment } from '../../../environments/environment';

@Injectable()
export class EntityTypeService {

    /**
     * Constructor
     *
     * @param http
     */
    constructor(
        private http: HttpClient
    ) { }

    /**
     * Retrieve the entity types
     *
     * @param callback
     */
    get(callback: Function) {

        return this.http.get<Array<EntityType>>(`${environment.apihost}/entitytype`)
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
     * Add a new entity type
     *
     * @param value
     * @param callback
     */
    add(value: string, callback: Function) {

        const et = new EntityType('', value);
        return this.http.post<Array<EntityType>>(`${environment.apihost}/entitytype`, et)
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

    /**
     * Delete an entity type
     *
     * @param et
     * @param callback
     */
    delete(et: EntityType, callback: Function) {
        console.log(et);
        return this.http.delete(`${environment.apihost}/entitytype/${et.id}`)
            .subscribe(data => {
                const out = new Response(true);
                callback(out);
            }, error => {
                const out = new Response(false);
                out.msg = error.msg;
                callback(out);
            });
    }

}
