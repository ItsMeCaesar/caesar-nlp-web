import { Injectable } from '@angular/core';

import { Alert, Locale } from './models';

@Injectable()
export class AppService {

    public loading = false;
    public alert = new Alert(false, '', '');
    public locales = [
        new Locale('pt_BR', 'Português (BR)'),
        new Locale('en_US', 'English (US)')
    ];

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
