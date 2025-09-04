import { type AppConfig } from '@types';
import { all } from 'deepmerge';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';

export const ENV: string = process.env.NODE_ENV || 'production';
export const PATH: string = join( __dirname, '../../..' );

async function loadCfgFile ( filePath: string ) : Promise< object > {

    try {

        const content = await readFile( filePath, 'utf8' );
        return load( content ) as object;

    } catch ( err ) {

        console.warn( `Cannot load config file ${ filePath }`, err );

    }

    return {};

}

export async function loadConfig () : Promise< AppConfig > {

    return all( [
        await loadCfgFile( join( PATH, `conf/default.yml` ) ),
        await loadCfgFile( join( PATH, `conf/env/${ ENV }.yml` ) ),
        await loadCfgFile( join( PATH, `i18n/i18n.config.yml` ) ),
        await loadCfgFile( join( PATH, `modules/modules.config.yml` ) )
    ] ) as AppConfig;

}
