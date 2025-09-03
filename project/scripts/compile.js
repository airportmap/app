const { execSync } = require( 'child_process' );
const { readFileSync } = require( 'fs' );
const { load } = require( 'js-yaml' );

const buildCfg = load( readFileSync( 'project/build.config.yml', 'utf8' ) );
const { server, client } = buildCfg.build.typescript;

async function compile ( config ) {

    const { configFile } = config;

    console.log( `Compiling TypeScript ...` );
    console.log( `Use: ${ configFile }` );

    try {

        // Compile TypeScript
        execSync( `tsc --build ${ configFile } --verbose`, { stdio: 'inherit' } );

        console.log( `TypeScript compiled successfully` );

    } catch ( err ) {

        console.error( `Failed to compile:`, err.message );
        process.exit( 1 );

    }

}

switch ( process.argv[ 2 ] ) {

    case 'server':
        compile( server ).catch( console.error );
        break;

    case 'client':
        compile( client ).catch( console.error );
        break;

    default:
        console.error( `Failed to compile unknown environment` );
        process.exit( 1 );

}
