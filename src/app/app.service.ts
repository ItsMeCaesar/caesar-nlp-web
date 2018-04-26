import { Injectable } from '@angular/core';

import { Alert } from './models';

@Injectable()
export class AppService {

    public loading = false;
    public alert = new Alert(false, '', '');

    /**
     * Shows the alert
     *
     * @param type
     * @param msg
     */
    public showAlert(type: string, msg: string) {
        this.alert = new Alert(true, type, msg);
        setTimeout(() => {
            this.alert = new Alert(false, '', '');
        }, 3000);
    }
}
