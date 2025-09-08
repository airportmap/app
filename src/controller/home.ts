import type { Server } from '@airportmap/server';
import type { Request, Response } from 'express';

export default async function get ( req: Request, res: Response, server: Server ) : Promise< void > {

    await server.renderer.render( req, res, {
        template: 'home',
        bodyClasses: '__apm __apm_home',
        assets: {},
        meta: {
            title: ( req as any ).t( 'app.home:title' ),
            description: ( req as any ).t( 'app.home:description' )
        },
        data: {}
    } );

}
