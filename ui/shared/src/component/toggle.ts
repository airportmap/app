const __backdrop = document.getElementById( 'backdrop' );

document.addEventListener( 'click', function ( e: PointerEvent ) : void {

    const target = e.target as HTMLElement;
    const toggle = target.closest( '[data-action="toggle"]' );

    if ( ! target.closest( '.___toggle_active' ) ) {

        document.querySelectorAll( '.___toggle_active' ).forEach( el => {
            el.classList.remove( '___toggle_active' );
        } );

    }

    if ( toggle ) {

        e.preventDefault();

        const selector = toggle.getAttribute( 'data-selector' );

        if ( selector ) {

            document.querySelectorAll( selector ).forEach( el => {
                el.classList.toggle( '___toggle_active' );
            } );

            if ( !! toggle.getAttribute( 'data-backdrop' ) ) {
                __backdrop.classList.add( '___active' );
            }

        }

    }

    if ( document.querySelectorAll( '.___toggle_active' ).length === 0 ) {
        __backdrop.classList.remove( '___active' );
    }

} );

export { __backdrop };
