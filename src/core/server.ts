import { type AppConfig } from '@config/index';
import express, { type Application } from 'express';
import { resolve } from 'path';

export async function createServer ( config: AppConfig ) : Promise< Application > {

    const app = express();

    app.set( 'view engine', 'pug' );
    app.set( 'views', resolve( config.paths.views ) );

    return app;

}
