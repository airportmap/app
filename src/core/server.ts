import { type AppConfig, type RouteConfig } from '@types';
import { PATH } from '@core/config';
import { setupI18n } from '@core/i18n';
import { initAssetLoader } from '@core/assets';
import { initRenderHelper } from '@core/render';
import { router } from '@core/router';
import express, { static as serveStatic, type Application } from 'express';
import { join } from 'path';

export async function createServer ( cfg: AppConfig, routes: RouteConfig[] ) : Promise< Application > {

    const { views, assets, js, css } = cfg.paths;

    const app = express();

    app.use( '/assets', serveStatic( join( PATH, assets ) ) );
    app.use( '/js', serveStatic( join( PATH, js ) ) );
    app.use( '/css', serveStatic( join( PATH, css ) ) );

    app.set( 'view engine', 'pug' );
    app.set( 'views', join( PATH, views ) );

    await setupI18n( app, cfg );

    initAssetLoader( cfg );
    initRenderHelper();

    await router( app, routes );

    return app;

}
