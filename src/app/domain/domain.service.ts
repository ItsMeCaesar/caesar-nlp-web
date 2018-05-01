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
            }, error => this.handleError(error, callback));
    }

    /**
     * Retrieve the domains by its ID
     *
     * @param id
     */
    getByID(id: string): Domain {
        return this.list.find(d => d.id === id);
    }

    /**
     * Add a new domain or update an existing one
     *
     * @param model
     * @param callback
     */
    persist(model: Domain, callback: Function) {

        if (model.id === '') {
            return this.http.post<Domain>(`${environment.apihost}/domain`, model)
                .subscribe(data => {
                    const out = new Response(true);
                    out.obj = data;
                    callback(out);
                }, error => this.handleError(error, callback));
        } else {
            return this.http.put<Domain>(`${environment.apihost}/domain`, model)
                .subscribe(data => {
                    const out = new Response(true);
                    out.obj = data;
                    callback(out);
                }, error => this.handleError(error, callback));
        }
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
