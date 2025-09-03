import { ENV, loadConfig } from '@config/index';
import { createServer } from '@core/server';

async function bootstrap () : Promise< void > {

    try {

        const config = await loadConfig();
        const app = await createServer( config );
        const port = config.server.port || 3000;

        app.listen( port, () => {

            console.log( `Airportmap server running on port ${ port }` );
            console.log( `Environment: ${ ENV }` );

        } );

    } catch ( err ) {

        console.error( `Failed to start server:`, err );
        process.exit( 1 );

    }

}

bootstrap();
