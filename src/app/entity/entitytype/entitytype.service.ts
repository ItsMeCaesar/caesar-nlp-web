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

        return this.http.get<Array<EntityType>>(`${environment}/entitytype`)
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



}
