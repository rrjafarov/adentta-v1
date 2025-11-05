// import Link from "next/link";
// import React, { useState } from "react";

// const MobileAccordion = ({ title, children, showIcon, isOpen, onClick }) => {
//   return (
//     <div className="mobileAccordion">
//       <button className="mobileAccordionHeader" onClick={onClick}>
//         <span>{title}</span>
//         {showIcon && (
//           <img
//             src={"/icons/bottomDown.svg"}
//             alt="Toggle Icon"
//             className={`toggle-icon ${isOpen ? "rotated" : ""}`}
//           />
//         )}
//       </button>
//       {isOpen && <div className="mobileAccordionContent">{children}</div>}
//     </div>
//   );
// };

// const MobileMenu = ({ t, isOpen, setIsOpen }) => {
//   const [openAccordion, setOpenAccordion] = useState(null);

//   const toggleAccordion = (accordion) => {
//     setOpenAccordion(openAccordion === accordion ? null : accordion);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {isOpen && <div className="overlaye" onClick={closeMenu}></div>}
//       {isOpen && (
//         <div className="mobileMenu">
//           <div className="mobileMenuItem">
//             <Link href="/products">
//               <span>{t?.products || "products"}</span>
//             </Link>
//             <MobileAccordion
//               title={t?.company || "company"}
//               showIcon={true}
//               isOpen={openAccordion === "company"}
//               onClick={() => toggleAccordion("company")}
//             >
//               <ul>
//                 <li>
//                   <Link href="/about">{t?.aboutCompany || " About Company"}</Link>
//                   <Link href="/team">{t?.team || "Team"}</Link>
//                   <Link href="/brands">{t?.brands || " Brands"}</Link>
//                   <Link href="/careers">{t?.careers || " Careers"}</Link>
//                 </li>
//               </ul>
//             </MobileAccordion>
//             <Link href="/doctors">
//               <span>{t?.doctors || "Doctors"}</span>
//             </Link>
//             <Link href="/events">
//               <span>{t?.events || "Events"}</span>
//             </Link>
//             <MobileAccordion
//               title={t?.media || "Media"}
//               showIcon={true}
//               isOpen={openAccordion === "media"}
//               onClick={() => toggleAccordion("media")}
//             >
//               <ul>
//                 <li>
//                   <Link href="/blogs">{t?.blogs || "Blogs"}</Link>
//                   <Link href="/videogalery">{t?.video || "VideoGalery"}</Link>
//                   <Link href="/catalog">{t?.pdfCatalog || "PDF Catalog"}</Link>
//                 </li>
//               </ul>
//             </MobileAccordion>
//             <Link href="/contact">
//               <span>{t?.contact || "Contact us"}</span>
//             </Link>

//             <div className="mobileLangChange">
//               <button>AZ</button>
//               <div></div>
//               <button>RU</button>
//               <div></div>
//               <button>EN</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileMenu;











// !son versiya
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const MobileAccordion = ({ title, children, showIcon, isOpen, onClick }) => {
  return (
    <div className="mobileAccordion">
      <button className="mobileAccordionHeader" onClick={onClick}>
        <span>{title}</span>
        {showIcon && (
          <img
            src={"/icons/bottomDown.svg"}
            alt="Toggle Icon"
            className={`toggle-icon ${isOpen ? "rotated" : ""}`}
          />
        )}
      </button>
      {isOpen && <div className="mobileAccordionContent">{children}</div>}
    </div>
  );
};

const MobileMenu = ({ t, isOpen, setIsOpen }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const router = useRouter();

  const toggleAccordion = (accordion) => {
    setOpenAccordion(openAccordion === accordion ? null : accordion);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLangChange = (lang) => {
    const currentLang = Cookies.get("NEXT_LOCALE") || "az";
    if (lang === currentLang) {
      return;
    }

    Cookies.set("NEXT_LOCALE", lang);

    const currentPath = window.location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
    const queryString = window.location.search || "";

    let newPath = lang === "az"
      ? `/az${currentPath}${queryString}`
      : `/${lang}${currentPath}${queryString}`;

    if (newPath) {
      router.replace(newPath).catch(() => {
        window.location.assign(newPath);
      });
      router.refresh();
    }
  };

  return (
    <>
      {isOpen && <div className="overlaye" onClick={closeMenu}></div>}
      {isOpen && (
        <div className="mobileMenu">
          <div className="mobileMenuItem">
            <Link href="/product">
              <span>{t?.products || "products"}</span>
            </Link>

            <MobileAccordion
              title={t?.company || "company"}
              showIcon={true}
              isOpen={openAccordion === "company"}
              onClick={() => toggleAccordion("company")}
            >
              <ul>
                <li>
                  <Link href="/about">{t?.aboutCompany || " About Company"}</Link>
                  <Link href="/team">{t?.team || "Team"}</Link>
                  <Link href="/brands">{t?.brands || " Brands"}</Link>
                  <Link href="/careers">{t?.careers || " Careers"}</Link>
                </li>
              </ul>
            </MobileAccordion>

            {/* <Link href="/doctors">
              <span>{t?.doctors || "Doctors"}</span>
            </Link> */}
            <Link href="/events">
              <span>{t?.events || "Events"}</span>
            </Link>

            <MobileAccordion
              title={t?.media || "Media"}
              showIcon={true}
              isOpen={openAccordion === "media"}
              onClick={() => toggleAccordion("media")}
            >
              <ul>
                <li>
                  <Link href="/blogs">{t?.blogs || "Blogs"}</Link>
                  <Link href="/videogalery">{t?.video || "VideoGalery"}</Link>
                  <Link href="/catalog">{t?.pdfCatalog || "PDF Catalog"}</Link>
                </li>
              </ul>
            </MobileAccordion>

            <Link href="/contact">
              <span>{t?.contact || "Contact us"}</span>
            </Link>

            {/* DİL DƏYİŞMƏ BUTONLARI */}
            <div className="mobileLangChange">
              <button onClick={() => handleLangChange("az")}>AZ</button>
              <div></div>
              <button onClick={() => handleLangChange("ru")}>RU</button>
              <div></div>
              <button onClick={() => handleLangChange("en")}>EN</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;

// !son versiya