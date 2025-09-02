'use strict';

import { join } from 'path';

import i18next from 'i18next';
import { LanguageDetector, handle } from 'i18next-http-middleware';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

import { DIR, CFG } from './config';

const {
    fallback = 'en',
    preload = [ 'en' ],
    https = false,
    expire = 86400
} = CFG.i18n ?? {};

i18next
    .use( ChainedBackend )
    .use( LanguageDetector )
    .init( {
        fallbackLng: fallback,
        preload: preload,
        defaultNS: 'generic',
        backend: {
            backends: [
                LocalStorageBackend,
                HttpBackend
            ],
            backendOptions: [ {
                expirationTime: expire
            }, {
                loadPath: join( DIR, 'locales/{{lng}}/{{ns}}.json' )
            } ]
        },
        detection: {
            order: [ 'cookie', 'header' ],
            lookupCookie: 'locale',
            caches: [ 'cookie' ],
            cookieSameSite: "strict",
            cookieSecure: https
        }
    } );

const i18n = handle( i18next );

export { i18n };
