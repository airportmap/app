import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';

export interface AppConfig {
    server: {
        host: string;
        https: boolean;
        port: number;
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

export async function loadConfig () : Promise<AppConfig> {

    const cfgFile = `${ ENV }.yml`;
    const cfgPath = join( __dirname, cfgFile );

    try {

        const cfgContent = readFileSync( cfgPath, 'utf8' );
        const config = load( cfgContent ) as AppConfig;

        return config;

    } catch ( err ) {

        throw new Error (
            `Failed to load configuration from < ${ cfgFile } > ${ err }`
        );

    }

}