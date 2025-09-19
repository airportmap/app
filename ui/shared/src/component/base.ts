const scrollableElement = ( set: boolean, el?: HTMLElement ) : void => {

    const classes = ( el || document.documentElement ).classList;

    if ( set ) classes.remove( '___noscroll' );
    else classes.add( '___noscroll' );

};

const showBackdrop = () : void => {

    document.getElementById( 'backdrop' ).classList.add( '___active' );
    scrollableElement( false );

};

const hideBackdrop = () : void => {

    document.getElementById( 'backdrop' ).classList.remove( '___active' );
    scrollableElement( true );

};

export { scrollableElement, showBackdrop, hideBackdrop };
