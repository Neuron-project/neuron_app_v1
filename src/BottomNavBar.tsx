import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavBar.styles.css';

import walletIcon from './components/styled/iconWallet.svg';
import appsIcon from './components/styled/IconCollection.svg';


interface NavItem {
  to: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: `/`, icon: walletIcon, label: 'Wallet' },
  { to: `/collection`, icon: appsIcon, label: 'Collection' },
];

const BottomNavBar: React.FC = () => {
  return (
    <nav className="bottom-nav-bar">
      {navItems.map((item) => (
        <NavLink to={item.to} key={item.to} /*activeCaassName='active'*/>
          <img
            src={item.icon}
            className="icon"
            alt={item.label}
            aria-label={item.label}
          />
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavBar;