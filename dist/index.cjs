'use strict';

var jsxRuntime = require('react/jsx-runtime');

var styles = {"footer":"Footer-module_footer__A76NF"};

const Footer = ({ children, className }) => (jsxRuntime.jsx("footer", { className: className ? `${styles.footer} ${className}` : styles.footer, children: children ?? 'Stopka' }));

exports.Footer = Footer;
//# sourceMappingURL=index.cjs.map
