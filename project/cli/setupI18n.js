const { execSync } = require( 'child_process' );
const { copyFileSync, mkdirSync, readFileSync } = require( 'fs' );
const { sync } = require( 'glob' );
const { load } = require( 'js-yaml' );
const { join, dirname } = require( 'path' );

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

        for ( const lngPattern of supportedLngs ) {

            for ( const nsPattern of namespaces ) {

                console.log( `Proceed files for ${ lngPattern }::${ nsPattern }` );

                const fileGlob = pattern
                    .replace( '{{lng}}', lngPattern )
                    .replace( '{{ns}}', nsPattern );

                const matches = sync( join( tmpDir, fileGlob ).replace( /\\/g, '/' ) );

                if ( matches.length === 0 )
                    console.warn( `No files found for ${ lngPattern }::${ nsPattern }` );

                for ( const srcFile of matches ) {

                    const relPath = srcFile.substring( tmpDir.length + 1 );
                    const tgtFile = join( target, relPath );

                    mkdirSync( dirname( tgtFile ), { recursive: true } );
                    copyFileSync( srcFile, tgtFile );

                    console.log( `Copied ${ relPath }` );

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
