import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./MobileNavigation.css";

const MobileNavigation = ({ open, mobile, onChooseItem, isAuth, onLogout }) => (
  <nav className={`mobile_nav ${open ? "open" : ""}`}>
    <ul className={`mobile_nav_items ${mobile ? "mobile" : ""}`}>
      <NavigationItems
        mobile
        onChoose={onChooseItem}
        isAuth={isAuth}
        onLogout={onLogout}
      />
    </ul>
  </nav>
);

export default MobileNavigation;
