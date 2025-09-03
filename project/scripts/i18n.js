const { load } = require( 'js-yaml' );
const { existsSync, mkdirSync, readFileSync } = require( 'fs' );
const { join } = require( 'path' );
const { execSync } = require( 'child_process' );

async function i18n () {

    console.log( `Integrating internationalization files ...` );

    // Load configurations
    const buildConfig = load( readFileSync( '../build.config.yml', 'utf8' ) );
    const i18nConfig  = load( readFileSync( '../i18n.config.yml', 'utf8' ) );

    const { temp } = buildConfig.paths;
    const { repository, branch, target } = i18nConfig.i18n;

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

    } catch ( err ) {

        console.error( `Failed to integrate i18n files:`, err.message );
        process.exit( 1 );

    }

}

i18n().catch( console.error );
