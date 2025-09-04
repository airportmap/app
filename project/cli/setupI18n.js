const { execSync } = require( 'child_process' );
const { copyFileSync, existsSync, mkdirSync, readFileSync } = require( 'fs' );
const { load } = require( 'js-yaml' );
const { join } = require( 'path' );

async function setupI18n () {

    console.log( `Load config ...` );

    const buildCfg = load( readFileSync( 'project/build.yml', 'utf8' ) );
    const i18nCfg = load( readFileSync( 'i18n/i18n.config.yml', 'utf8' ) );
    const { repo, branch, target } = buildCfg.i18n;
    const { pattern, supportedLngs, namespaces } = i18nCfg.i18n;

    const tmpDir = 'temp/i18n';

    try {

        console.log( `Cloning i18n repository ...` );

        execSync( `rm -rf ${ tmpDir }` );
        execSync( `git clone --depth 1 --branch ${ branch } ${ repo } ${ tmpDir }`, {
            stdio: 'pipe'
        } );

        console.log( `Create target directory structure ...` );

        execSync( `rm -rf ${ target }` );
        mkdirSync( target, { recursive: true } );

        console.log( `Copy necessary i18n files ...` );

        for ( const lng of supportedLngs ) {

            const lngDir = join( target, lng );
            mkdirSync( lngDir, { recursive: true } );

            for ( const ns of namespaces ) {

                const fileName = pattern
                    .replaceAll( '{{lng}}', lng )
                    .replaceAll( '{{ns}}', ns );

                const srcFile = join( tmpDir, fileName );
                const tgtFile = join( target, fileName );

                if ( existsSync( srcFile ) ) {

                    copyFileSync( srcFile, tgtFile );

                    console.log( `Copied ${ lng }::${ ns }` );

                } else {

                    console.warn( `Missing file for ${ lng }::${ ns }` );

                }

            }

        }

        console.log( `Set up i18n successfully` );

    } catch ( err ) {

        console.error( `Failed to set up i18n:`, err.message );
        process.exit( 1 );

    }

}

setupI18n().catch( console.error );
