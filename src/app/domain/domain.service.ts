import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Domain, Response } from '../models';
import { environment } from '../../environments/environment';

@Injectable()
export class DomainService {

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

        return this.http.get<Array<Domain>>(`${environment}/domain`)
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
