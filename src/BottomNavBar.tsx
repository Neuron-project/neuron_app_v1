import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavBar.styles.css';
import WalletIcon from "./components/styled/WalletIcon.png";
import CollectionIcon from "./components/styled/CollectionIcon.png";


interface NavItem {
  to: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: `/`, icon: WalletIcon, label: 'Wallet' },
  { to: `/collection`, icon: CollectionIcon, label: 'Collection' },
];

const BottomNavBar: React.FC = () => {
  return (
    <nav className="bottom-nav-bar">
      {navItems.map((item) => (
        <NavLink to={item.to} key={item.to} /*activeCaassName='active'*/>
          <img
            src={item.icon}
            style={{ width: 25, height: 25 }}
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