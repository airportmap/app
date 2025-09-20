const uuid = () : string => {

    if ( window.crypto && crypto.randomUUID )
        return crypto.randomUUID();

    return 'xxxxxxxxyxxx'.replace( /[xy]/g, c => {

        const r = Math.random() * 16 | 0;
        return ( c === 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );

    } );

}

export { uuid };
