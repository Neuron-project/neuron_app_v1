import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavBar.styles.css';


interface NavItem {
  to: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: `/neuron_app_v1/`, icon: 'https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/5fb28192-53e7-4c89-8651-22504e64a5c5.png?raw=true', label: 'Wallet' },
  { to: `/neuron_app_v1/collection`, icon: 'https://github.com/Neuron-project/neuron_app_v1/blob/main/src/components/styled/6fdf801c-682f-455a-aca6-69c7319bce33.png?raw=true', label: 'Collection' },
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