import { type Application } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';

interface RouteConfig {
    path: string;
    handler: string;
    methods?: string[];
}

export async function setupRoutes ( app: Application ) : Promise< void > {

    const routesPath = join( __dirname, '../routes.yml' );
    const routesContent = readFileSync( routesPath, 'utf8' );

    const routes = load( routesContent ) as { routes: RouteConfig[] };

    for ( const route of routes.routes ) {

        const methods = route.methods || [ 'GET' ];
        const handlerPath = join( __dirname, '../pages', route.handler );

        try {

            const handler = await import( handlerPath );
            const controller = handler.default || handler;

            methods.forEach( ( method ) => {

                const methodName = method.toLowerCase() as keyof Application;

                if ( typeof app[ methodName ] === 'function' )
                    ( app[ methodName ] as any )( route.path, controller );

            } );

        } catch ( err ) {

            console.warn( `Failed to load handler for route ${ route.path }:`, err );

        }

    }

}
