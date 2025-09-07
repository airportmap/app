import { Server } from '@airportmap/server';

( async () : Promise< void > => {

    const server = new Server ( process.cwd() );
    await server.init();

    server.run();

} )();
