'use strict';

import type { Request, Response } from 'express';

function handler ( req: Request, res: Response ) : void {

    res.render( 'layout', {} );

}

export { handler as home };
