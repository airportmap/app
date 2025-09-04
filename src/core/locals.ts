import { type NextFunction, type Request, type Response } from 'express';

export function injectLocals ( req: Request, res: Response, next: NextFunction ) : void {

    res.locals.t = req.t;
    res.locals.lang = req.language;

    next();

}
