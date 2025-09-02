'use strict';

import express from 'express';

import { CFG } from './includes/config';

const app = express();

app.listen( CFG.server.port );
