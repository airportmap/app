import { type AppConfig } from '@core/config';
import { type Application } from 'express';
import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';
import { LanguageDetector, handle } from 'i18next-http-middleware';

export async function setupI18n ( app: Application, cfg: AppConfig ) : Promise< void > {

    await i18next
        .use( FsBackend )
        .use( LanguageDetector )
        .init( {} );

    app.use( handle( i18next ) );

}
