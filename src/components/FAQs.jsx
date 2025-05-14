"use client";
import Link from "next/link";
import React, { useState } from "react";

const FilterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <img
          src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
          alt="Toggle Icon"
          className="toggle-icon"
        />
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

const FAQs = ({ faqData, t }) => {
  return (
    <div className="faqPage">
      <div className="container">
        <div className="faqTop topper">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{t?.faqPageTitle || "FAQs"}</h4>
        </div>
        <div className="faqPageHeaderText">
          <h2>{t?.faqPageTitle || "FAQs"}</h2>
          <span>{t?.faqPageAsked || "Frequently Asked Questions"}</span>
        </div>
        <div className="faqsAccordions">
          <div className="faqsAccordion">
            {faqData.map((item) => (
              <FilterAccordion key={item.id} title={item.title}>
                {/* Eğer içerik HTML ise, aşağıdaki gibi render edebilirsiniz */}
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                {/* Eğer plain text ise, direkt {item.content} şeklinde kullanabilirsiniz */}
              </FilterAccordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
