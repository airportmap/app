'use strict';

/**
 * src/includes/config.js
 * ----------
 * Central configuration loader for the Airportmap App.
 * 
 * - Determines the project root directory (DIR)
 * - Loads environment-specific configuration from YAML files
 * - Exposes constants DIR, ENV, and CFG for use throughout the app
 * 
 * Usage:
 *   import { DIR, ENV, CFG } from './includes/config.js';
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

export const DIR = path.resolve(
    path.dirname( fileURLToPath( import.meta.url ) ),
    '../../'
);

export const ENV = process.env.NODE_ENV || 'default';

const cfgPath = path.join( DIR, `config/${ENV}.yml` );

if ( ! fs.existsSync( cfgPath ) ) throw new Error (
    `Config file not found: ${cfgPath}`
);

export const CFG = yaml.load( fs.readFileSync( cfgPath ) );
