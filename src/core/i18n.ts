import { type AppConfig } from '@config/index';
import { type Application } from 'express';
import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';
import { LanguageDetector, handle } from 'i18next-http-middleware';
import { join } from 'path';

export async function setupI18n ( app: Application, config: AppConfig ) : Promise< void > {

    const { https, debug } = config.server;
    const { defaultLanguage, supportedLanguages, namespaces } = config.i18n;

    await i18next
        .use( FsBackend )
        .use( LanguageDetector )
        .init( {
            debug: debug,
            fallbackLng: defaultLanguage,
            supportedLngs: supportedLanguages,
            ns: namespaces,
            defaultNS: 'app.generic',
            backend: {
                loadPath: join( config.paths.locales, '{{lng}}/{{ns}}.json' )
            },
            detection: {
                order: [ 'cookie', 'header' ],
                lookupCookie: 'locale',
                caches: [ 'cookie' ],
                cookieSameSite: 'strict',
                cookieSecure: https
            }
        } );

    app.use( handle( i18next ) );

}
