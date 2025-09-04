import { ENV, loadConfig } from '@core/config';
import { createServer } from '@core/server';

async function bootstrap () : Promise< void > {

    try {

        const cfg = await loadConfig();
        const app = await createServer( cfg );

        const { host, port, https, debug } = cfg.server;

        app.listen( port, () => {

            console.log( `Airportmap server running at port:`, port );
            console.log( `Environment:`, ENV );
            console.log( `Host:`, host );
            console.log( `Secure HTTPS:`, https );
            console.log( `Debug enabled:`, debug );

        } );

    } catch ( err ) {

        console.error( `Failed to start server:`, err.message );
        process.exit( 1 );

    }

}

bootstrap();
