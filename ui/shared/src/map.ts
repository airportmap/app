import type { APMapOptions } from '@airportmap/types';
import { APMap } from '@airportmap/map';
import { uuid } from './component/utils';
import { __theme, __units } from './component/device';

const maps: Record< string, APMap > = {};

const getMapByID = ( id: string ) : APMap | undefined => maps[ id ];

function initMaps () : void {

    document.querySelectorAll< HTMLScriptElement >( '[data-load="map"]' ).forEach( loader => {

        try {

            const data: APMapOptions = JSON.parse( loader.textContent );
            const id = uuid();
            const el = document.createElement( 'div' );

            data.theme = data.theme ?? __theme() as APMapOptions[ 'theme' ];
            data.units = data.units ?? __units() as APMapOptions[ 'units' ];
            el.id = id;

            loader.replaceWith( el );

            const map = new APMap( el, data );
            maps[ id ] = map;

        } catch ( e ) { console.error( `Map init failed:`, e ) }

    } );

}

if ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', initMaps );
else initMaps();

export { maps, getMapByID };
