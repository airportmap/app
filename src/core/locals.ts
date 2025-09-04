import { type NextFunction, type Request, type Response } from 'express';

export function injectLocals ( req: Request, res: Response, next: NextFunction ) : void {

    res.locals.lang = req.language;
    res.locals.t = req.t;

    next();

}
