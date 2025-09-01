'use strict';

import fs from 'fs';
import express from 'express';
import yaml from 'js-yaml';

import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';

const ENV = process.env.NODE_ENV || 'default';
const CONFIG = yaml.load( fs.readFileSync( `./config/${ENV}.yml` ) );

const app = express();

i18next.use( Backend ).use( i18nextMiddleware.LanguageDetector ).init( {
    fallbackLng: 'en',
    nonExplicitSupportedLngs: true,
    preload: [ 'en', 'de' ],
    backend: { loadPath: './locales/{{lng}}.json' },
    detection: {
        order: [ 'cookie', 'header' ],
        lookupCookie: 'locale',
        caches: [ 'cookie' ],
        cookieSecure: false,
        cookieSameSite: 'strict'
    }
} );

app.use( i18nextMiddleware.handle( i18next ) );

app.set( 'view engine', 'pug' );
app.set( 'views', './app/templates/' );

app.get( '/', ( req, res ) => {
    res.status( 200 ).render( 'home', {
        lng: req.language, t: req.t
    } );
} );

app.listen( 3000, () => {} );
