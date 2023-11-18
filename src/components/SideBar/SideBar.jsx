import React, { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { AiOutlineWechat } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./SideBar.scss";

const SideBar = () => {
  const list = [
    { icon: GoHomeFill, name: "Home" },
    { icon: BsFillBarChartFill, name: "Cryptocurrencies" },
    { icon: FaMoneyBillWave, name: "Exchanges" },
    { icon: AiOutlineWechat, name: "News" },
  ];

  const [active, setActive] = useState(list[0].name);

  return (
    <div className="sidebar">
      <div className="items">
        {list.map((item, i) => (
          <Link
            to={
              item.name.toLowerCase() === "home" ? "/" : item.name.toLowerCase()
            }
            key={i + item.name}
          >
            <div
              className={`item ${active === item.name ? "active" : ""}`}
              onClick={() => setActive(item.name)}
            >
              <item.icon />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
