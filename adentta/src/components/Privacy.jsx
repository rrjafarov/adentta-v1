import Image from "next/image";
import Link from "next/link";
import React from "react";

const Support = ({ t, title, content }) => {
  return (
    <div className="supportPage">
      <div className="container">
        <div className="supportTop topper">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{t?.privacyPageTitle || "Privacy & Policy"}</h4>
        </div>
        <div className="supportPageHeaderText">
          <h2> {t?.supportPageTitle || "support"}</h2>
          <span>{t?.privacyPageTitle || "Privacy & Policy"}</span>
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
