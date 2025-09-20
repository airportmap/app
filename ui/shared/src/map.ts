import type { APMapOptions } from '@airportmap/types';
import { Map } from '@airportmap/map';

const maps: Record< string, Map > = {};

const getMapByID = ( id: string ) : Map | undefined => maps[ id ];

function initMaps () : void {

    document.querySelectorAll< HTMLScriptElement >( '[data-load="map"]' ).forEach( loader => {

        try {

            const data: APMapOptions = JSON.parse( loader.textContent );
            const uuid = '';
            const el = document.createElement( 'div' );

            el.id = uuid;
            el.classList.add( '__apm_map' );

            loader.replaceWith( el );

            maps[ uuid ] = new Map ( el, data );

        } catch ( e ) { console.error( `Map init failed:`, e ) }

    } );

}

if ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', initMaps );
else initMaps();

export { maps, getMapByID };
