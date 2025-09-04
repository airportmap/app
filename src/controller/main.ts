import { type Request, type Response } from 'express';

export default function get ( req: Request, res: Response ) : void {

    res.render( 'main', {} );

}
