import { type GlobalContext, type RenderOptions } from '@types';
import { ENV } from '@core/config';
import { type Request, type Response } from 'express';

class RenderHelper {

    public async render ( req: Request, res: Response, options: RenderOptions ) : Promise< void > {

        try {

            const { template, assets, meta = {}, data = {} } = options;

            const globalContext = await this.getGlobalContext( req );

            res.status( 200 ).render( template, {
                ...globalContext,
                ...data,
                assets: { css: {}, js: {} },
                meta: {
                    ...globalContext.meta,
                    ...meta
                }
            } );

        } catch ( err ) {

            console.warn( `Render error:`, err );
            res.status( 500 ).render( 'base/error', { err } );

        }

    }

    private async getGlobalContext ( req: Request ) : Promise< GlobalContext > {

        return {
            t: req.t.bind( req ),
            lang: req.language,
            host: req.get( 'host' ) || '',
            protocol: req.protocol,
            originalUrl: req.originalUrl,
            path: req.path,
            query: req.query,
            params: req.params,
            env: ENV,
            assets: { css: [], js: [] },
            meta: {
                title: req.t( 'app.generic:title' ),
                description: req.t( 'app.generic:description' ),
                canonical: `${ req.protocol }://${ req.get( 'host' ) }${ req.originalUrl }`,
                robots: 'index, follow'
            }
        };

    }

}

export const renderHelper = new RenderHelper ();
