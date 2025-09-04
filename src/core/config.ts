import { type AppConfig } from '@types';

export const ENV: string = process.env.NODE_ENV || 'production';

export async function loadConfig () : Promise< AppConfig > {

    return {} as AppConfig;

}
