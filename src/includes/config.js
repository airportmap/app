'use strict';

/**
 * src/includes/config.js
 * ----------
 * Central configuration loader for the Airportmap App.
 * 
 * - Determines the project root directory (DIR)
 * - Loads environment-specific configuration from YAML files
 * - Exposes constants DIR, ENV, and CFG for use throughout the app
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

/** 
 * Project root directory (app/)
 * Resolves relative to this file location
 */
export const DIR = path.resolve(
    path.dirname( fileURLToPath( import.meta.url ) ),
    '../../'
);

/** 
 * Current environment
 * Can be set via NODE_ENV, defaults to `default`
 */
export const ENV = process.env.NODE_ENV || 'default';

/** 
 * Path to the YAML config file for the current environment
 */
const cfgPath = path.join( DIR, `config/${ENV}.yml` );

/**
 * Load YAML configuration file
 * Throws an error if the file is missing
 */
if ( ! fs.existsSync( cfgPath ) ) throw new Error (
    `Config file not found: ${cfgPath}`
);

/**
 * Parsed configuration object
 * Can be used throughout the app
 */
export const CFG = yaml.load(
    fs.readFileSync( cfgPath, 'utf-8' )
);
