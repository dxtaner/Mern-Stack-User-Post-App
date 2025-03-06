import React from "react";
import { NavLink } from "react-router-dom";

import MobileToggle from "../MobileToggle/MobileToggle";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import "./MainNavigation.css";

const MainNavigation = ({ onOpenMobileNav, isAuth, onLogout }) => (
  <nav className="main_nav">
    <MobileToggle onOpen={onOpenMobileNav} />
    <div className="main_nav_logo">
      <NavLink to="/posts" exact="true">
        <Logo />
      </NavLink>
    </div>
    <div className="spacer" />
    <ul className="main_nav_items">
      <NavigationItems isAuth={isAuth} onLogout={onLogout} />
    </ul>
  </nav>
);

export default MainNavigation;
