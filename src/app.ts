import { Server } from '@airportmap/server';

export const server = new Server ( process.cwd() );

server.init().then( ( s ) => s.run );
