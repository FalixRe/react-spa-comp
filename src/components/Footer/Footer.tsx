import type { ReactNode } from 'react';
import styles from './Footer.module.css';

export interface FooterProps {
    children?: ReactNode;
    className?: string;
}

export const Footer: React.FC<FooterProps> = ({ children, className }) => (
    <footer className={className ? `${styles.footer} ${className}` : styles.footer}>
        {children ?? 'Stopka'}
    </footer>
);