'use strict';

import fs from 'fs';
import express from 'express';
import yaml from 'js-yaml';

const ENV = process.env.NODE_ENV || 'default';
const CONFIG = yaml.load( fs.readFileSync( `./config/${ENV}.yml` ) );

console.log( ENV, CONFIG );

const app = express();

app.listen( 3000, () => {} );
