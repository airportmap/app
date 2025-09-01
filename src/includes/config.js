'use strict';

/**
 * Central configuration loader for the Airportmap App.
 * 
 * - Determines the project root directory (DIR)
 * - Loads environment-specific configuration from YAML files
 * - Exposes constants DIR, ENV, and CFG for use throughout the app
 * - Also loads express routes from a YAML file (ROUTES)
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
 * Load YAML configuration file
 */
const cfgPath = path.join( DIR, `config/${ENV}.yml` );

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

/**
 * Load express routes
 */
const routesPath = path.join( DIR, `config/routes.yml` );

if ( ! fs.existsSync( routesPath ) ) throw new Error (
    `Express routes can not be loaded`
);

/**
 * Parsed express routes object
 * Will be used by the app router
 */
export const ROUTES = yaml.load(
    fs.readFileSync( routesPath, 'utf-8' )
);
