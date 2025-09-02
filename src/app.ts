'use strict';

import express from 'express';

import { CFG } from './includes/config';
import { i18n_setup } from './includes/i18n';

const app = express();

i18n_setup( app );

app.listen( CFG.server.port );
