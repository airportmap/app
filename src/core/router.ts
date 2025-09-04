import { type RouteConfig } from '@types';
import { type Application } from 'express';

export async function router ( app: Application, routes: RouteConfig[] ) : Promise< void > {

    for ( const { method, path, controller } of routes ) {

        try {

            const cntlr = await import( `../controller/${ controller }` );
            const handler = cntlr.handler || cntlr.default || cntlr;

            const method_ = method.toLowerCase() as keyof Application;

            if ( typeof app[ method_ ] === 'function' )
                ( app[ method_ ] as any )( path, handler );

        } catch ( err ) {

            console.warn( `Failed to load controller for route ${ method }::${ path }`, err );

        }

    }

}
