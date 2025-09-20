import type { Server } from '@airportmap/server';
import type { Request, Response } from 'express';

export default async function get ( req: Request, res: Response, server: Server ) : Promise< void > {

    await server.renderer.render( req, res, {
        template: 'home',
        bodyClasses: '__apm __apm_home',
        assets: {
            js: [ 'shared/map' ]
        },
        meta: {
            title: ( req as any ).t( 'app.home:_title' ),
            description: ( req as any ).t( 'app.home:_description' )
        },
        data: {}
    } );

}
