'use strict';

import express from 'express';
import path from 'path';

import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';

import { DIR, CFG } from './includes/config.js';

const app = express();

i18next.use( Backend ).use( i18nextMiddleware.LanguageDetector ).init( {
    fallbackLng: CFG.i18n.fallback,
    nonExplicitSupportedLngs: true,
    preload: CFG.i18n.preload,
    backend: {
        loadPath: path.join( DIR, './locales/{{lng}}/{{ns}}.json' )
    },
    detection: {
        order: [ 'cookie', 'header' ],
        lookupCookie: 'locale',
        caches: [ 'cookie' ],
        cookieSameSite: 'strict',
        cookieSecure: CFG.i18n.secure
    }
} );

app.use( i18nextMiddleware.handle( i18next ) );

app.set( 'view engine', 'pug' );
app.set( 'views', path.join( DIR, 'app/templates/' ) );

app.listen( CFG.server.port );
