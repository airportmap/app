'use strict';

import express from 'express';
import { join } from 'path';

import { DIR, CFG } from './includes/config';
import { i18n } from './includes/i18n';
import { locals } from './includes/locals';
import { routes } from './includes/routing';

const { port = 3000 } = CFG.server ?? {};

const app = express();

app.set( 'views', join( DIR, 'templates' ) );
app.set( 'view engine', 'pug' );

app.use( i18n, locals );

for ( const route of routes ) {
    ( app as any )[ route.method ]( route.path, route.handler );
}

app.listen( port );
