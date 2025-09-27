import type { APMapOptions } from '@airportmap/types';
import { APMap } from '@airportmap/map';
import { uuid } from './component/utils';

const maps: Record< string, APMap > = {};

const getMapByID = ( id: string ) : APMap | undefined => maps[ id ];

function initMaps () : void {

    document.querySelectorAll< HTMLScriptElement >( '[data-load="map"]' ).forEach( loader => {

        try {

            const data: APMapOptions = JSON.parse( loader.textContent );
            const id = uuid();
            const el = document.createElement( 'div' );

            el.id = id;

            loader.replaceWith( el );

            const map = new APMap ( el, data );
            maps[ id ] = map;

        } catch ( e ) { console.error( `Map init failed:`, e ) }

    } );

}

if ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', initMaps );
else initMaps();

export { maps, getMapByID };
