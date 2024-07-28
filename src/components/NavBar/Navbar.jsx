import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiBars2, HiMiniXMark } from "react-icons/hi2";
import { GoHomeFill } from "react-icons/go";
import { BsFillBarChartFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import { setActivePage } from "../../services/activePageSlice.js";
import "./Navbar.scss";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const list = [
    { icon: GoHomeFill, name: "Home" },
    { icon: BsFillBarChartFill, name: "Cryptocurrencies" },
  ];

  const { activePage } = useSelector((state) => state.ActivePage);
  const dispatch = useDispatch();

  const [active, setActive] = useState(activePage);

  const [showFullMenu, setShowFullMenu] = useState(false);

  const handelActive = (name) => {
    sessionStorage.setItem("active-page", name);
    dispatch(setActivePage(name));
  };

  useEffect(() => {
    setActive(activePage);
  }, [activePage]);

  useEffect(() => {
    const subActive = () => {
      const string = window.location.pathname.substring(
        1,
        window.location.pathname.length
      );

      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleEvent = () => {
      dispatch(
        setActivePage(window.location.pathname === "/" ? "Home" : subActive())
      );
    };

    window.addEventListener("popstate", handleEvent);
    return () => window.removeEventListener("popstate", handleEvent);
  });

  return (
    <>
      <div className="navbar">
        <div className="menu">
          <div className="bar" onClick={() => setShowFullMenu(true)}>
            <HiBars2 />
          </div>
          <Link to={"/"} className="logo">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>

      <div
        className={`side ${showFullMenu ? "show" : ""}`}
        onClick={() => setShowFullMenu(false)}
      >
        <div className="menu-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <Link to={"/"} className="side-logo">
              <img src={logo} alt="logo" />
            </Link>
            <div className="close" onClick={() => setShowFullMenu(false)}>
              <HiMiniXMark />
            </div>
          </div>
          <div className="items">
            {list.map((item, i) => (
              <Link
                to={
                  item.name.toLowerCase() === "home"
                    ? "/"
                    : item.name.toLowerCase()
                }
                key={i + item.name}
                onClick={() => setShowFullMenu(false)}
              >
                <div
                  className={`item ${active === item.name ? "active" : ""}`}
                  onClick={() => handelActive(item.name)}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
