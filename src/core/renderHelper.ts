import { type RenderOptions } from '@types';
import { type Request, type Response } from 'express';

class RenderHelper {

    constructor () {}

    public async render ( req: Request, res: Response, opt: RenderOptions ) : Promise< void > {

        const { template, title, description, keywords, assets = {}, data = {} } = opt;

        try {

            const ctx = {
                ...data,
                meta: {
                    title: title,
                    description: description,
                    keywords: keywords
                }
            };

            res.render( template, ctx );

        } catch ( err ) {

            console.warn( `Render error:`, err );
            res.status( 500 ).render( 'error', { error: 'Internal Server Error' } );

        }

    }

}

export const renderHelper = new RenderHelper ();
