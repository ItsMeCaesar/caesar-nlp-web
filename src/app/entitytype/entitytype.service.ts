import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityType, Response } from '../models';
import { environment } from '../../environments/environment';

@Injectable()
export class EntityTypeService {

    public list = new Array<EntityType>();

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
                this.list = data;
                this.list = this.list.sort((left, right) => left.name.localeCompare(right.name));
                callback(new Response(true));
            }, error => {
                this.handleError(error, callback);
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
        return this.http.post<EntityType>(`${environment.apihost}/entitytype`, et)
            .subscribe(data => {
                this.list.push(data);
                this.list = this.list.sort((left, right) => left.name.localeCompare(right.name));
                callback(new Response(true));
            }, error => {
                this.handleError(error, callback);
            });
    }

    /**
     * Delete an entity type
     *
     * @param et
     * @param callback
     */
    delete(et: EntityType, callback: Function) {
        return this.http.delete(`${environment.apihost}/entitytype/${et.id}`)
            .subscribe(data => {
                this.list.splice(this.list.findIndex(obj => obj.id === et.id), 1);
                this.list = this.list.sort((left, right) => left.name.localeCompare(right.name));
                callback(new Response(true));
            }, error => {
                this.handleError(error, callback);
            });
    }


    /**
     * Handle API errors
     *
     * @param error
     * @param callback
     */
    private handleError(error: any, callback: Function) {
        const out = new Response(false);
        out.msg = error.msg;
        callback(out);
    }

}
