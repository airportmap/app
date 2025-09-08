import { server } from '@app';
import { type Request, type Response } from 'express';

export default async function get ( req: Request, res: Response ) : Promise< void > {

    await server.renderer.render( req, res, {
        template: 'home',
        assets: {},
        meta: {
            title: ( req as any ).t( 'app.home:title' ),
            description: ( req as any ).t( 'app.home:description' )
        },
        data: {}
    } );

}
