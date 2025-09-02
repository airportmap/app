'use strict';

import type { RequestHandler } from 'express';

import { home } from '../handlers/home';

interface RouteConfig {
    path: string;
    method: 'get' | 'post';
    handler: RequestHandler;
}

const routes: RouteConfig[] = [
    { path: '{/}', method: 'get', handler: home }
];

export { type RouteConfig, routes };
