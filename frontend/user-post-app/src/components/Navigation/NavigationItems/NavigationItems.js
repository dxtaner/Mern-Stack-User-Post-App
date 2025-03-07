import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navItems = [
  { id: "about", text: "About", link: "/about", auth: true },
  { id: "feed", text: "Feed", link: "/posts", auth: true },
  { id: "login", text: "Login", link: "/login", auth: false },
  { id: "signup", text: "Signup", link: "/signup", auth: false },
];

const NavigationItems = (props) => [
  ...navItems
    .filter((item) => item.auth === props.isAuth)
    .map((item) => (
      <li
        key={item.id}
        className={["navigation_item", props.mobile ? "mobile" : ""].join(" ")}>
        <NavLink
          to={item.link}
          exact="true.toString()"
          onClick={props.onChoose}>
          {item.text}
        </NavLink>
      </li>
    )),
  props.isAuth && (
    <li className="navigation_item" key="logout">
      <button onClick={props.onLogout}>Logout</button>
    </li>
  ),
];

export default NavigationItems;
