import { type AppConfig } from '@types';
import { PATH } from '@core/config';
import { setupI18n } from '@core/i18n';
import { router } from '@core/router';
import express, { static as static_, type Application } from 'express';
import { join } from 'path';

export async function createServer ( cfg: AppConfig ) : Promise< Application > {

    const { views, assets, js, css } = cfg.paths;

    const app = express();

    app.set( 'view engine', 'pug' );
    app.set( 'views', join( PATH, views ) );

    app.use( '/assets', static_( join( PATH, assets ) ) );
    app.use( '/js', static_( join( PATH, js ) ) );
    app.use( '/css', static_( join( PATH, css ) ) );

    await setupI18n( app, cfg );
    await router( app, cfg );

    return app;

}
