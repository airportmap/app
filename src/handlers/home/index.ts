'use strict';

import type { Request, Response } from 'express';

export default function home ( req: Request, res: Response ) : void {

    res.render( 'layout', {} );

}
