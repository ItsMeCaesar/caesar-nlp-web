import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Domain, Response } from '../models';
import { environment } from '../../environments/environment';

@Injectable()
export class DomainService {

    public list = new Array<Domain>();

    /**
     * Constructor
     *
     * @param http
     */
    constructor(
        private http: HttpClient
    ) { }

    /**
     * Retrieve the domains
     *
     * @param callback
     */
    get(callback: Function) {

        return this.http.get<Array<Domain>>(`${environment.apihost}/domain/list`)
            .subscribe(data => {
                const out = new Response(true);
                this.list = data;
                callback(out);
            }, error => {
                const out = new Response(false);
                out.msg = error.msg;
                callback(out);
            });
    }

    /**
     * Retrieve the domains by its ID
     *
     * @param id
     */
    getByID(id: string): Domain {
        return this.list.find(d => d.id === id);
    }

}
