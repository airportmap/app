import { __isHTTPS } from './device';

class Cookie {

    public static get ( name: string ) : string | null {

        const cookies = document.cookie ? document.cookie.split( '; ' ) : [];

        for ( let i = 0; i < cookies.length; i++ ) {

            const [ key, val ] = cookies[ i ].split( '=' );

            if ( key === decodeURIComponent( name ) )
                return decodeURIComponent( val );

        }

        return null;

    }

    public static set ( name: string, value: string, expires: number = 1.2e9, path: string = '/' ) : void {

        let cookie = `${ encodeURIComponent( name ) }=${ encodeURIComponent( value ) }`;

        if ( ! isNaN( expires ) )
            cookie += `; expires=${ new Date( Date.now() + expires ).toUTCString() }`;

        if ( __isHTTPS )
            cookie += `; secure`;

        document.cookie = cookie + `; path=${ path }; samesite=Strict`;

    }

    public static delete ( name: string, path: string = '/' ) : void {

        this.set( name, '', -1, path );

    }

}

document.addEventListener( 'click', function ( e: PointerEvent ) : void {

    const target = e.target as HTMLElement;
    const cookie = target.closest< HTMLElement >( '[data-action="cookie"]' );

    if ( cookie ) {

        const name = cookie.getAttribute( 'data-name' );
        const val = cookie.getAttribute( 'data-value' );

        if ( name && val ) {

            e.preventDefault();

            Cookie.set( name, val );

            if ( !! cookie.getAttribute( 'data-reload' ) )
                document.location.reload();

        }

    }

} );

document.addEventListener( 'change', function ( e: Event ) : void {

    const target = e.target as HTMLElement;
    const cookie = target.closest< HTMLSelectElement >( '[data-action="cookie"]' );

    if ( cookie ) {

        const name = cookie.getAttribute( 'data-name' );
        const val = cookie.value;

        if ( name && val ) {

            e.preventDefault();

            Cookie.set( name, val );

            if ( !! cookie.getAttribute( 'data-reload' ) )
                document.location.reload();

        }

    }

} );

export { Cookie };
