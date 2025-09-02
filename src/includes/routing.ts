'use strict';

import type { RequestHandler } from 'express';

import home from '../handlers/home';

export interface RouteConfig {
    path: string;
    method: 'get' | 'post';
    handler: RequestHandler;
}

export const routes: RouteConfig[] = [
    { path: '{/}', method: 'get', handler: home }
];
