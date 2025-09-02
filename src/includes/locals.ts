'use strict';

import type { Request, Response, NextFunction } from 'express';

function locals ( req: Request, res: Response, next: NextFunction ) : void {

    res.locals.t = req.t;
    res.locals.lang = req.language;
    res.locals.url = req.originalUrl;

    next();

}

export { locals };
