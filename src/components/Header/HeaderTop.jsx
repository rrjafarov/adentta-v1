


"use client"
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const HeaderTop = ({ t }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="headerTop">
      <div className="headerTopItem container">
        <Link className="headerTopLink" href="/products">
          <p>{t?.products || "SEE ALL PRODUCTS"}</p>
          <span>
            <Image
              src="/icons/rightDown.svg"
              alt="Down Icon"
              width={19}
              height={19}
            />
          </span>
        </Link>
        <div
          className="headerTopClose"
          onClick={() => setIsVisible(false)}
          style={{ cursor: "pointer" }}
        >
          <IoClose />
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;

