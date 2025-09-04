import { type AppConfig } from '@core/config';
import { type Application } from 'express';
import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';
import { LanguageDetector, handle } from 'i18next-http-middleware';

export async function setupI18n ( app: Application, cfg: AppConfig ) : Promise< void > {

    const { pattern, fallbackLng, supportedLngs, namespaces } = cfg.i18n;

    await i18next
        .use( FsBackend )
        .use( LanguageDetector )
        .init( {
            fallbackLng: fallbackLng,
            supportedLngs: supportedLngs,
            ns: namespaces,
            defaultNS: namespaces[ 0 ],
            backend: {
                loadPath: pattern
            },
            detection: {
                order: [ 'cookie', 'header' ],
                lookupCookie: 'locale',
                caches: [ 'cookie' ],
                cookieSameSite: 'strict'
            }
        } );

    app.use( handle( i18next ) );

}
