import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoArrowUpRight } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { BiLogoLinkedinSquare } from "react-icons/bi";

import { setActivePage } from "../../services/activePageSlice";
import "./Footer.scss";

const Footer = () => {
  const list = [
    { name: "Home" },
    { name: "Cryptocurrencies" },
    { name: "Exchanges" },
    { name: "News" },
  ];

  const dispatch = useDispatch();

  const changeActive = (name) => {
    sessionStorage.setItem("active-page", name);
    dispatch(setActivePage(name));
  };

  return (
    <div className="footer">
      <div className="side-list">
        {list.map((item) => (
          <Link
            key={item.name}
            to={`/${
              item.name.toLowerCase() === "home" ? "" : item.name.toLowerCase()
            }`}
            onClick={() => changeActive(item.name)}
          >
            <div className="content">
              <span>{item.name}</span>
              <div className="icon">
                <MdKeyboardArrowRight />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="social-media">
        <div className="links">
          <div className="links-item">
            <span>Portfolio</span>
            <div className="icon">
              <GoArrowUpRight />
            </div>
          </div>
        </div>

        <div className="social">
          <div className="icon">
            <AiFillInstagram />
          </div>
          <div className="icon">
            <BsGithub />
          </div>
          <div className="icon">
            <BiLogoLinkedinSquare />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
