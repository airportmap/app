const __isHTTPS = location.protocol === 'https:';
const __isMobile = document.documentElement.classList.contains( '___mobile' );

const __theme = () : string => document.documentElement.getAttribute( 'data-theme' ) || 'light';

export { __isHTTPS, __isMobile, __theme };
