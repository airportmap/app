export interface ServerConfig {
    server: {
        host: string;
        port: number;
        https: boolean;
        debug: boolean;
    };
    paths: {
        locales: string;
        controllers: string;
        views: string;
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
