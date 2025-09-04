import { type AppConfig } from '@types';
import { type Application } from 'express';
import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';
import { LanguageDetector, handle } from 'i18next-http-middleware';
import { join } from 'path';

export async function setupI18n ( app: Application, cfg: AppConfig ) : Promise< void > {

    const { pattern, fallbackLng, supportedLngs, namespaces } = cfg.i18n;
    const { https, debug } = cfg.server;
    const { locales } = cfg.paths;

    await i18next
        .use( FsBackend )
        .use( LanguageDetector )
        .init( {
            debug: debug,
            fallbackLng: fallbackLng,
            supportedLngs: supportedLngs,
            ns: namespaces,
            defaultNS: namespaces[ 0 ],
            backend: {
                loadPath: join( locales, pattern )
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
