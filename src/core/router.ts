import { type RouteConfig } from '@types';
import { type Application } from 'express';

export async function router ( app: Application, routes: RouteConfig[] ) : Promise< void > {

    for ( const { method, path, controller } of routes ) {

        try {

            const cntlr = await import( `../controller/${ controller }` );
            const fn = cntlr[ method ] || cntlr.default || cntlr;

            if ( typeof app[ method ] === 'function' && typeof fn === 'function' )
                ( app[ method ] as any )( path, fn );

        } catch ( err ) {

            console.warn( `Failed to load controller for route ${ method }::${ path }`, err );

        }

    }

}
