'use strict';

import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { load } from 'js-yaml';

const ENV: string = process.env.NODE_ENV || 'default';
const DIR: string = resolve( dirname( fileURLToPath( import.meta.url ) ), '../..' );

const cfgPath = join( DIR, `config/${ ENV }.yml` );

if ( ! existsSync( cfgPath ) )
    throw new Error ( `Config file not found: ${ cfgPath }` );

const CFG: any = load( readFileSync( cfgPath, 'utf-8' ) );

export { ENV, DIR, CFG };
