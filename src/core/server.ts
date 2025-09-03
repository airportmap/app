import { type AppConfig } from '@config/index';
import { setupI18n } from '@core/i18n';
import express, { static as assets, type Application } from 'express';
import { join } from 'path';

export async function createServer ( config: AppConfig ) : Promise< Application > {

    const app = express();

    app.set( 'view engine', 'pug' );
    app.set( 'views', join( __dirname, '../views' ) );

    app.use( '/assets', assets( join( __dirname, '../public/assets' ) ) );
    app.use( '/js', assets( join( __dirname, '../public/js' ) ) );
    app.use( '/css', assets( join( __dirname, '../public/css' ) ) );

    await setupI18n( app, config );

    return app;

}
