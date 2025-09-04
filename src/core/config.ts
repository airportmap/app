import { type AppConfig, type RouteConfig } from '@types';
import { all } from 'deepmerge';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';

export const ENV: string = process.env.NODE_ENV || 'production';
export const PATH: string = join( __dirname, '../../..' );

async function loadCfgFile ( filePath: string ) : Promise< object > {

    try {

        const content = await readFile( join( PATH, filePath ), 'utf8' );
        return load( content ) as object;

    } catch ( err ) {

        console.warn( `Cannot load config file ${ filePath }`, err );

    }

    return {};

}

export async function loadConfig () : Promise< AppConfig > {

    return all( [
        await loadCfgFile( `conf/default.yml` ),
        await loadCfgFile( `conf/env/${ ENV }.yml` ),
        await loadCfgFile( `i18n/i18n.config.yml` ),
        await loadCfgFile( `modules/modules.config.yml` )
    ] ) as AppConfig;

}

export async function loadRoutes () : Promise< RouteConfig[] > {

    const routes = await loadCfgFile( `conf/routes.yml` );

    return ( routes as any ).routes ?? {} as RouteConfig[];

}
