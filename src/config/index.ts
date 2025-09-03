import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';

export interface AppConfig {
    server: {
        host: string;
        https: boolean;
        port: number;
        debug: boolean;
    };
    i18n: {
        defaultLanguage: string;
        supportedLanguages: string[];
        namespaces: string[];
    };
    modules: {
        enabled: string[];
    };
    paths: {
        views: string;
        public: string;
        locales: string;
    };
}

export const ENV: string = process.env.NODE_ENV || 'production';

export async function loadConfig () : Promise< AppConfig > {

    const cfgFile = `env/${ ENV }.yml`;
    const cfgPath = join( __dirname, cfgFile );

    try {

        const cfgContent = readFileSync( cfgPath, 'utf8' );
        return load( cfgContent ) as AppConfig;

    } catch ( err ) {

        console.error( `Failed to load configuration from ${ cfgFile }`, err );
        process.exit( 1 );

    }

}
