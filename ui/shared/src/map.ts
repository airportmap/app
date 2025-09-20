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
            el.classList.add( '__apm_map' );

            loader.replaceWith( el );

            maps[ id ] = new APMap ( el, data );

        } catch ( e ) { console.error( `Map init failed:`, e ) }

    } );

}

if ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', initMaps );
else initMaps();

export { maps, getMapByID };
