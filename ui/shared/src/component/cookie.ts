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

    public static set (
        name: string, value: string, expires?: number, path: string = '/',
        domain?: string, secure: boolean = __isHTTPS,
        sameSite: 'Lax' | 'Strict' | 'None' = 'Strict'
    ) : void {

        let cookie = `${ encodeURIComponent( name ) }=${ encodeURIComponent( value ) }`;

        if ( expires !== undefined ) {

            const date = new Date();
            date.setTime( date.getTime() + expires * 1000 );

            cookie += `; expires=${ date.toUTCString() }`;

        }

        cookie += `; path=${ path }`;
        if ( domain ) cookie += `; domain=${ domain }`;
        if ( secure ) cookie += `; secure`;
        if ( sameSite ) cookie += `; samesite=${ sameSite }`;

        document.cookie = cookie;

    }

    public static delete ( name: string, path: string = '/', domain?: string ) : void {

        this.set( name, '', -1, path, domain );

    }

}

document.addEventListener( 'click', function ( e: PointerEvent ) : void {

    const target = e.target as HTMLElement;
    const cookie = target.closest( '[data-cookie]' );

    if ( cookie ) {

        const name = cookie.getAttribute( 'data-cookie' );
        const val = cookie.getAttribute( 'data-content' );

        if ( name && val ) {

            e.preventDefault();

            Cookie.set( name, val );

            if ( !! cookie.getAttribute( 'data-reload' ) )
                this.location.reload();

        }

    }

} );

document.addEventListener( 'change', function ( e: Event ) : void {

    const target = e.target as HTMLElement;
    const cookie: HTMLSelectElement = target.closest( '[data-cookie]' );

    if ( cookie ) {

        const name = cookie.getAttribute( 'data-cookie' );
        const val = cookie.value;

        if ( name && val ) {

            e.preventDefault();

            Cookie.set( name, val );

            if ( !! cookie.getAttribute( 'data-reload' ) )
                this.location.reload();

        }

    }

} );
