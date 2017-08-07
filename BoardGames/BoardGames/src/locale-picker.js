import { inject, observable } from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@inject(I18N)
export class LocalePicker {

    @observable
    selectedLocale;

    locales = ['en', 'es'];

    constructor(i18n) {
        this.i18n = i18n;

        this.selectedLocale = this.i18n.getLocale();
    }

    selectedLocaleChanged() {
        this.i18n.setLocale(this.selectedLocale);
    }
}