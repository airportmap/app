export interface ServerConfig {
    server: {
        host: string;
        port: number;
        https: boolean;
        debug: boolean;
    };
    paths: {
        views: string;
        locales: string;
        assets: string;
        js: string;
        css: string;
    };
}

export interface I18nConfig {
    pattern: string;
    fallbackLng: string;
    supportedLngs: string[];
    namespaces: string[];
}

export interface ModuleConfig {}

export interface AppConfig extends ServerConfig {
    i18n: I18nConfig;
    modules: ModuleConfig[];
}

export interface RouteConfig {
    method: string;
    path: string;
    controller: string;
}

export interface PageAssets {
    css: Array< {
        href: string;
        media?: string;
        rel?: string;
    } >;
    js: Array< {
        src: string;
        type?: string;
        defer?: boolean;
        async?: boolean;
        module?: boolean;
    } >;
    preload?: Array< {
        href: string;
        as: string;
        type?: string;
    } >;
}

export interface GlobalContext {
    t: ( key: string, options?: any ) => string;
    lang: string;
    host: string;
    protocol: string;
    originalUrl: string;
    path: string;
    query: any;
    params: any;
    appName: string;
    version: string;
    env: string;
    assets: PageAssets;
    meta: {
        title?: string;
        description?: string;
        keywords?: string;
        canonical?: string;
        robots?: string;
    };
}

export interface RenderOptions {
    template: string;
    title?: string;
    description?: string;
    keywords?: string;
    assets?: {
        css?: string[];
        js?: string[];
        inline?: {
            css?: string[];
            js?: string[];
        };
    };
    meta?: Partial< GlobalContext[ 'meta' ] >;
    data?: Record< string, any >;
}
