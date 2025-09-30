const __isHTTPS = location.protocol === 'https:';
const __isMobile = document.documentElement.classList.contains( '___mobile' );

const __theme = () : string => document.documentElement.getAttribute( 'data-theme' ) || 'light';
const __units = () : string => document.documentElement.getAttribute( 'data-units' ) || 'default';

export { __isHTTPS, __isMobile, __theme, __units };
