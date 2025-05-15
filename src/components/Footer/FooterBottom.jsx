// !
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const FooterBottom = ({ t }) => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState(
    () => Cookies.get("NEXT_LOCALE") || "az"
  );

  const handleLangChange = (event) => {
    const lang = event.target.value;
    if (lang === currentLang) return;
    Cookies.set("NEXT_LOCALE", lang);
    setCurrentLang(lang);

    // Remove any existing locale prefix from the path
    const currentPath =
      window.location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
    const queryString = window.location.search || "";
    const prefix = lang === "az" ? "/az" : `/${lang}`;
    const newPath = `${prefix}${currentPath}${queryString}`;

    router.replace(newPath).catch(() => window.location.assign(newPath));
    router.refresh();
  };

  return (
    <div className="container footerBottom">
      <div className="copyright">
        <span>©2025 ADENTTA. {t?.allRightsReserved || "All rights reserved"}</span>
      </div>

      <div className="footerBottomInner">
        <div className="footerPolicy">
          <div className="footerSelect">
            <select
              className="custom-select"
              value={currentLang}
              onChange={handleLangChange}
            >
              <option value="en">en</option>
              <option value="ru">ru</option>
              <option value="az">az</option>
            </select>
          </div>
          <Link href="/faq">
            <span>{t?.faqPageTitle || "FAQs"}</span>
          </Link>
          <Image
            src="/icons/footerDot.svg"
            alt="dot"
            width={4}
            height={4}
          />
          <Link href="/privacy">
            <span className="policyBootmLine">
              {t?.privacyPageTitle || "Privacy & Policy"}
            </span>
          </Link>
          <Image
            src="/icons/footerDot.svg"
            alt="dot"
            width={4}
            height={4}
          />
          <Link href="/support">
            <span className="policyBootmLine">
              {t?.userTermsPage || "User Terms"}
            </span>
          </Link>
        </div>

        <div className="oneStudio">
          <span>{t?.developerBy || "Developed and Designed by "}</span>
          <h4>ONE STUDIO</h4>
          <Link href="https://one.az/" target="_blank">
            <Image
              src="/icons/oneStudio.svg"
              alt="one.az"
              width={33}
              height={33}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
