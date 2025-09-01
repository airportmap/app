'use strict';

import { ROUTES } from './config.js';

export default async function router ( app ) {

    for ( const { uri, handler } of Object.values( ROUTES ) ) {

        app.get( uri, ( req, res, next ) => {

            try {

                //

            } catch ( error ) {

                next();

            }

        } );

    }

}
