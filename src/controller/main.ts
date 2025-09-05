import { renderHelper } from '@core/render';
import { type Request, type Response } from 'express';

export default async function get ( req: Request, res: Response ) : Promise< void > {

    await renderHelper.render( req, res, {
        template: 'main',
        assets: {},
        meta: {
            title: req.t( 'app.home:title' ),
            description: req.t( 'app.home:description' ),
        },
        data: {}
    } );

}
