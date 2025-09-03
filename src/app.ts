import { loadConfig } from '@config/index';

async function bootstrap () : Promise< void > {

    try {

        const config = await loadConfig();

    } catch ( err ) {

        console.error( `Failed to start server:`, err );
        process.exit( 1 );

    }

}

bootstrap();
