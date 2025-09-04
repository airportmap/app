import { type AppConfig } from '@core/config';
import { setupI18n } from '@core/i18n';
import express, { type Application } from 'express';

export async function createServer ( cfg: AppConfig ) : Promise< Application > {

    const app = express();

    setupI18n( app, cfg );

    return app;

}
