document.addEventListener( 'click', function ( e: PointerEvent ) : void {

    const target = e.target as HTMLElement;
    const toggle = target.closest( '[data-toggle]' );

    if ( ! target.closest( '.___toggle_active' ) ) {

        document.querySelectorAll( '.___toggle_active' ).forEach( el => {
            el.classList.remove( '___toggle_active' );
        } );

    }

    if ( toggle ) {

        e.preventDefault();

        const selector = toggle.getAttribute( 'data-toggle' );

        if ( selector ) {

            document.querySelectorAll( selector ).forEach( el => {
                el.classList.toggle( '___toggle_active' );
            } );

        }

    }

} );
