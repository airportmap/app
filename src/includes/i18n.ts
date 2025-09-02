'use strict';

import i18next from 'i18next';
import { LanguageDetector, handle } from 'i18next-http-middleware';
import ChainedBackend from 'i18next-chained-backend';
import FsBackend from 'i18next-fs-backend';
import { join } from 'path';

import { DIR, CFG } from './config';

const {
    fallback = 'en-US', preload = [ 'en-US' ],
    https = false, debug = false
} = CFG.i18n ?? {};

i18next
    .use( ChainedBackend )
    .use( LanguageDetector )
    .init( {
        debug: debug,
        fallbackLng: fallback,
        preload: preload,
        defaultNS: 'generic',
        ns: [ 'generic' ],
        backend: {
            backends: [
                FsBackend
            ],
            backendOptions: [ {
                loadPath: join( DIR, 'locales/{{ns}}/{{lng}}.json' )
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
