import { ENV, loadConfig } from '@core/config';
import { createServer } from '@core/server';

async function bootstrap () : Promise< void > {

    try {

        const cfg = await loadConfig();
        const app = await createServer( cfg );

        const port = cfg.server.port || 3000;

        app.listen( port, () => {

            console.log( `Airportmap server running at port:`, port );
            console.log( `Environment:`, ENV );

        } );

    } catch ( err ) {

        console.error( `Failed to start server:`, err.message );
        process.exit( 1 );

    }

}

bootstrap();
