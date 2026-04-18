import { jsx } from 'react/jsx-runtime';

var styles = {"footer":"Footer-module_footer__A76NF"};

const Footer = ({ children, className }) => (jsx("footer", { className: className ? `${styles.footer} ${className}` : styles.footer, children: children ?? 'Stopka' }));

export { Footer };
//# sourceMappingURL=index.esm.js.map
