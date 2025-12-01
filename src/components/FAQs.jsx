"use client";
import Link from "next/link";
import React, { useState } from "react";

const FilterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <h3 className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <img
          src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
          alt="Toggle Icon"
          className="toggle-icon"
        />
      </h3>
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
            <strong className="topper">Adentta</strong>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{t?.faqPageTitle || "FAQs"}</span>
        </div>
        <div className="faqPageHeaderText">
          <span>{t?.faqPageTitle || "FAQs"}</span>
          <h1>{t?.faqPageAsked || "Frequently Asked Questions"}</h1>
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
