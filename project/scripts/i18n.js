const { load } = require( 'js-yaml' );
const { copyFileSync, existsSync, mkdirSync, readFileSync } = require( 'fs' );
const { join } = require( 'path' );
const { execSync } = require( 'child_process' );

async function i18n () {

    console.log( `Integrating internationalization files ...` );

    // Load configurations
    const buildConfig = load( readFileSync( '../build.config.yml', 'utf8' ) );
    const i18nConfig  = load( readFileSync( '../i18n.config.yml', 'utf8' ) );

    const { temp } = buildConfig.paths;
    const { repository, branch, target, pattern, languages, namespaces } = i18nConfig.i18n;

    const tmpDir = join( temp, 'i18n' );

    try {

        // Clone translations repository
        console.log( `Cloning translations repository ...` );

        if ( existsSync( tmpDir ) )
            execSync( `rm -rf ${ tmpDir }` );
    
        execSync( `git clone --depth 1 --branch ${ branch } ${ repository } ${ tmpDir }`, {
            stdio: 'pipe'
        } );

        // Create target directory structure
        if ( existsSync( target ) )
            execSync( `rm -rf ${ target }` );

        mkdirSync( target, { recursive: true } );

        // Copy only needed namespaces and languages
        for ( const lng of languages ) {

            const lngDir = join( target, lng );
            mkdirSync( lngDir, { recursive: true } );

            for ( const ns of namespaces ) {

                const fileName = pattern
                    .replaceAll( '{{lng}}', lng )
                    .replaceAll( '{{ns}}', ns );

                const sourceFile = join( tmpDir, fileName );

                if ( existsSync( sourceFile ) ) {

                    const targetFile = join( lngDir, fileName );
                    copyFileSync( sourceFile, targetFile );

                    console.log( `Copied ${lng}::${ns} as < ${ fileName } >` );

                } else {

                    console.warn( `Missing translation file < ${ fileName } >` );

                }

            }

        }

        // Cleanup
        execSync( `rm -rf ${ tmpDir }` );

        console.log( `Internationalization files integrated successfully` );

    } catch ( err ) {

        console.error( `Failed to integrate i18n files:`, err.message );
        process.exit( 1 );

    }

}

i18n().catch( console.error );
