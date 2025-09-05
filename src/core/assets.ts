import { type AppConfig, type AssetsConfig } from '@types';

class AssetLoader {

    private manifest: AssetsConfig;

    constructor ( cfg: AppConfig ) {

        this.manifest = cfg.assets;

    }

}

let assetLoader: AssetLoader;

function initAssetLoader ( cfg: AppConfig ) : void {

    assetLoader = new AssetLoader ( cfg );

}

export { initAssetLoader, assetLoader };
