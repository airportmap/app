import { type AppConfig } from '@types';
import { join } from 'path';

export const ENV: string = process.env.NODE_ENV || 'production';

export const PATH: string = join( __dirname, '../..' );

export async function loadConfig () : Promise< AppConfig > {

    return {} as AppConfig;

}
