import { type AppConfig } from '@types';
import { setupI18n } from '@core/i18n';
import express, { static as static_, type Application } from 'express';

export async function createServer ( cfg: AppConfig ) : Promise< Application > {

    const { views, assets, js, css } = cfg.paths;

    const app = express();

    app.set( 'view engine', 'pug' );
    app.set( 'views', views );

    app.use( '/assets', static_( assets ) );
    app.use( '/js', static_( js ) );
    app.use( '/css', static_( css ) );

    await setupI18n( app, cfg );

    return app;

}
