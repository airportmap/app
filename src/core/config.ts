export interface I18nConfig {
    pattern: string;
    fallbackLng: string;
    supportedLngs: string[];
    namespaces: string[];
}

export interface AppConfig {
    i18n: I18nConfig;
}
