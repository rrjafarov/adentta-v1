import Image from "next/image";
import Link from "next/link";
import React from "react";

const Support = ({ t, title, content }) => {
  return (
    <div className="supportPage">
      <div className="container">
        <div className="supportTop topper">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{t?.privacyPageTitle || "Privacy & Policy"}</span>
        </div>
        <div className="supportPageHeaderText">
          <span> {t?.supportPageTitle || "support"}</span>
          <h1>{t?.privacyPageTitle || "Privacy & Policy"}</h1>
        </div>
        <div className="supportPageContent">
          <div className="supportPageContentText">
            <div className="supportPageContentTextInner">
              <span>{title}</span>
              <div className="supportPageContentTextInnerParagraph">
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
