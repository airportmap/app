import { type Request, type Response } from 'express';

export default function homeController ( req: Request, res: Response ) : void {

    res.status( 200 ).render( 'home/views/index', {} );

}
