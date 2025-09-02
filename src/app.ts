'use strict';

import express from 'express';
import { join } from 'path';

import { DIR, CFG } from './includes/config';
import { i18n_setup } from './includes/i18n';
import { routes } from './includes/routing';

const { port = 3000 } = CFG.server;

const app = express();

i18n_setup( app );

app.set( 'views', join( DIR, 'templates' ) );
app.set( 'view engine', 'pug' );

for ( const route of routes ) {
    ( app as any )[ route.method ]( route.path, route.handler );
}

app.listen( port );
