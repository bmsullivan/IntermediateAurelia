import environment from './environment';
import Backend from 'i18next-xhr-backend';
import { ValidationMessageProvider } from 'aurelia-validation';
import { I18N } from 'aurelia-i18n';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin('aurelia-validation')
        .plugin('aurelia-i18n', (i18n) => {
            i18n.i18next.use(Backend);

            return i18n.setup({
                    backend: {
                        loadPath: '/locales/{{lng}}/{{ns}}.json'
                    },
                    lng: 'en',
                    fallbackLng: 'en',
                    debug: environment.debug
                });
        })
        .feature('bootstrap-validation')
        .feature('resources');

    ValidationMessageProvider.prototype.getMessage = function (key) {
        const i18n = aurelia.container.get(I18N);
        const translation = i18n.tr(`errorMessages.${key}`);
        return this.parser.parse(translation);
    };

    ValidationMessageProvider.prototype.getDisplayName = function (propertyName, displayName) {
        if (displayName !== null && displayName !== undefined) {
            return displayName;
        }
        const i18n = aurelia.container.get(I18N);
        return i18n.tr(propertyName);
    };


    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
}
