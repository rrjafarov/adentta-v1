
  "use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const HeaderTop = ({ t, settingData }) => {
  const storageKey = "headerTopClosed"; // tek bir sabit key

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // sayfa yüklendiğinde eğer daha önce kapatıldıysa gizle
    if (sessionStorage.getItem(storageKey) === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(storageKey, "true"); // artık tüm sayfalarda kapalı kalsın
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="headerTop">
      <div className="headerTopItem container">
        <Link className="headerTopLink" href={settingData.link}>
          <p>{settingData.page_title}</p>
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
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        >
          <IoClose />
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;


