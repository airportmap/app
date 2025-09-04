import { type AppConfig, type RouteConfig } from '@types';
import { PATH } from '@core/config';
import { type Application } from 'express';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';

export async function router ( app: Application, cfg: AppConfig ) : Promise< void > {

    const { controllers } = cfg.paths;
    const cntlrBase = join( PATH, controllers );

    const routesContent = await readFile( join( PATH, 'conf/routes.yml' ), 'utf8' );
    const routes = load( routesContent ) as { routes: RouteConfig[] };

    for ( const { method = 'GET', path, controller } of routes.routes ) {

        const cntlrPath = join( cntlrBase, controller );

        try {

            const methodName = method.toLowerCase() as keyof Application;

            const cntlr = await import( cntlrPath );
            const handler = cntlr.default || cntlr;

            if ( typeof app[ methodName ] === 'function' )
                ( app[ methodName ] as any )( path, handler );

        } catch ( err ) {

            console.warn( `Failed to load controller for route ${ method }::${ path }`, err.message );

        }

    }

}
