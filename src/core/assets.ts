import { type AppConfig, type AssetsConfig, type Assets, type RenderOptions, type ServerConfig } from '@types';

class AssetLoader {

    private manifest: AssetsConfig;
    private paths: ServerConfig[ 'paths' ];

    constructor ( cfg: AppConfig ) {

        this.manifest = cfg.assets;
        this.paths = cfg.paths;

    }

    public async assets ( options: RenderOptions[ 'assets' ] ) : Promise< Assets > {

        const assets: Assets = {
            preload: this.manifest.preload ?? [],
            css: [], js: []
        };

        return assets;

    }

}

let assetLoader: AssetLoader;

function initAssetLoader ( cfg: AppConfig ) : void {

    assetLoader = new AssetLoader ( cfg );

}

export { initAssetLoader, assetLoader };
