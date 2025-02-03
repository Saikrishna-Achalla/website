import React from 'react';
import Link from 'next/link';

const NavItem = ({ active, href, name }) => {
    return (
        <Link href={href}>
            <div className={`py-2 transition-all ${active ? 'text-primary-200' : 'text-surface-600 hover:text-primary-200'}`}>
                {name}
            </div>
        </Link>
    );
};

export default NavItem; 