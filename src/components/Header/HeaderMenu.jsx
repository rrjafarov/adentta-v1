// // ! NEW products page

// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import SearchPopup from "../SearchPopup";
// import Image from "next/image";
// import MobileMenu from "@/components/MobileMenu";
// import HeaderSearchIcon from "../../../public/icons/searchIcon.svg";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// const HeaderMenu = ({ t, categoryData, isHomePage }) => {
//  const [selectedLang, setSelectedLang] = useState("az");

//   useEffect(() => {
//     const storedLang = Cookies.get("NEXT_LOCALE");
//     if (storedLang) {
//       setSelectedLang(storedLang);
//     }
//   }, []);

//   const handleLanguageChange = (lang) => {
//     const newLocale = lang;
//     if (!newLocale || newLocale === selectedLang) return;

//     try {
//       Cookies.set("NEXT_LOCALE", newLocale, { path: "/" });
//       setSelectedLang(newLocale);

//       const currentPath = window.location.pathname.replace(
//         /^\/[a-z]{2}(?=\/|$)/,
//         ""
//       );
//       const queryString = window.location.search || "";
//       const newPath = `/${newLocale}${currentPath}${queryString}`;
//       window.location.href = newPath;
//     } catch (error) {
//       console.error("Language change error:", error);
//     }
//   };

//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);
//   const togglePopup = () => setIsPopupOpen(!isPopupOpen);
//   const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

//   return (
//     <>
//       <div className="container">
//         <div className="headerMenu">
//           <div className="headerMenuLeft">
//             <Link
//               className="logo"
//               href="/"
//               style={isHomePage ? { pointerEvents: "none" } : undefined}
//             >
//               <img src="/images/logo.svg" alt="Adentta" />
//             </Link>
//           </div>

//           <div className="mobileMenuIcon" onClick={toggleMobileMenu}>
//             <img
//               src={
//                 isMobileMenuOpen
//                   ? "/icons/popupCloseIcon.svg"
//                   : "/icons/mobileMenuIcon.svg"
//               }
//               alt="Menu Icon"
//             />
//           </div>

//           {isMobileMenuOpen && (
//             <MobileMenu
//               t={t}
//               isOpen={isMobileMenuOpen}
//               setIsOpen={setIsMobileMenuOpen}
//             />
//           )}

//           <div className="headerMenuItem">
//             <nav>
//               <ul>
//                 <div className="dropdown">
//                   <li>
//                     <Link className="productsLinkName" href="#">
//                       {t?.products || "products"}
//                     </Link>
//                     <img
//                       className="bottomDown"
//                       src="/icons/bottomDown.svg"
//                       alt=""
//                     />
//                     <div className="dropdown-content">
//                       <div className="dropHeader">
//                         <h4>{t?.megaMenuTitle || "Categories"}</h4>
//                       </div>
//                       <div className="rower">
//                         <div className="row">

//                           <div className="xl-12 lg-12">
//                             <div className="rowerd">
//                               {categoryData
//                                 .filter((category) => !category.parent_id)
//                                 .map((category) => {
//                                   const children = categoryData.filter((sub) =>
//                                     sub.parent_id?.some(
//                                       (p) => p.id === category.id
//                                     )
//                                   );
//                                   return (
//                                     <div key={category.id} className="column">
//                                       {/* Üst kateqoriya adı */}
//                                       <Link
//                                         href={`/product-page?per_page=12&filters[0][key]=categories&filters[0][operator]=IN&filters[0][value][]=${category.id}`}
//                                       >
//                                         <h3>
//                                           <img
//                                             src={`https://admin.adentta.az/storage${category.icon}`}
//                                             alt={category.title}
//                                           />
//                                           <span>{category.title}</span>
//                                         </h3>
//                                       </Link>

//                                       {/* Alt kateqoriyalar */}
//                                       <div className="columnLinks">
//                                         {children.slice(0,5).map((child) => (
//                                           <Link
//                                             key={child.id}
//                                             href={`/product-page?per_page=12&filters[0][key]=categories&filters[0][operator]=IN&filters[0][value][]=${child.id}`}
//                                             className="subLink"
//                                           >
//                                             {child.title}
//                                           </Link>
//                                         ))}
//                                       </div>
//                                     </div>
//                                   );
//                                 })}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 </div>

//                 <div className="dropdownCompany">
//                   <li>
//                     <Link className="productsLinkName" href="#">
//                       {t?.company || "company"}
//                     </Link>
//                     <img
//                       className="bottomDown"
//                       src="/icons/bottomDown.svg"
//                       alt=""
//                     />
//                     <div className="dropdown-contentCompany">
//                       <div className="dropCompany">
//                         <ul>
//                           <li>
//                             <Link href="/about">
//                               {t?.aboutCompany || " About Company"}
//                             </Link>
//                           </li>
//                           <li>
//                             <Link href="/team">{t?.team || "Team"}</Link>
//                           </li>
//                           <li>
//                             <Link href="/brands">{t?.brands || " Brands"}</Link>
//                           </li>
//                           <li>
//                             <Link href="/careers">
//                               {t?.careers || " Careers"}
//                             </Link>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </li>
//                 </div>
//                 <li>
//                   <Link className="productsLinkName" href="/events">
//                     {t?.events || "Events"}
//                   </Link>
//                 </li>
//                 <div className="dropdownMedia">
//                   <li>
//                     <Link className="productsLinkName" href="/">
//                       {t?.media || "Media"}
//                     </Link>
//                     <img
//                       className="bottomDown"
//                       src="/icons/bottomDown.svg"
//                       alt=""
//                     />
//                     <div className="dropdown-contentMedia">
//                       <div className="dropMedia">
//                         <ul>
//                           <li>
//                             <Link href="/blogs">{t?.blogs || "Blogs"}</Link>
//                           </li>
//                           <li>
//                             <Link href="/videogalery">
//                               {t?.video || "VideoGalery"}
//                             </Link>
//                           </li>
//                           <li>
//                             <Link href="/catalog">
//                               {t?.pdfCatalog || "PDF Catalog"}
//                             </Link>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </li>
//                 </div>
//                 <li>
//                   <Link className="productsLinkName" href="/contact">
//                     {t?.contact || "Contact us"}
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           <div className="headerMenuRight">
//             <div className="changeLang" onClick={toggleMenu}>
//               <div className="looops">
//                 <span>{selectedLang}</span>
//                 <img src="/icons/bottomDown.svg" alt="Toggle Language" />
//               </div>

//               {isOpen && (
//                 <div className="langOptions">
//                   {selectedLang !== "az" && (
//                     <button onClick={() => handleLanguageChange("az")}>az</button>
//                   )}
//                   {selectedLang !== "en" && (
//                     <button onClick={() => handleLanguageChange("en")}>en</button>
//                   )}
//                   {selectedLang !== "ru" && (
//                     <button onClick={() => handleLanguageChange("ru")}>ru</button>
//                   )}
//                 </div>
//               )}
//             </div>
//             <button onClick={togglePopup} className="searchButton">
//               <HeaderSearchIcon className="searchIconHead" />
//             </button>

//             {isPopupOpen && (
//               <SearchPopup t={t} closePopup={() => setIsPopupOpen(false)} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeaderMenu;
// // ! New products page end












"use client";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import SearchPopup from "../SearchPopup";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";
import HeaderSearchIcon from "../../../public/icons/searchIcon.svg";
import Cookies from "js-cookie";

// --- Helper: slugify & slug getter ---
const slugify = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getCategorySlug = (cat) =>
  cat?.url_slug ?? cat?.slug ?? cat?.url ?? cat?.urlSlug ?? slugify(cat?.title ?? "");

// YALNIZ SLUG (ID YOX)
const buildCategoryHref = (cat) => {
  const slug = getCategorySlug(cat) || slugify(String(cat?.title ?? ""));
  return `/products?category=${encodeURIComponent(slug)}`;
};

const HeaderMenu = ({ t, categoryData = [], isHomePage }) => {
  const [selectedLang, setSelectedLang] = useState("az");

  useEffect(() => {
    const storedLang = Cookies.get("NEXT_LOCALE");
    if (storedLang) setSelectedLang(storedLang);
  }, []);

  const handleLanguageChange = (lang) => {
    const newLocale = lang;
    if (!newLocale || newLocale === selectedLang) return;
    try {
      Cookies.set("NEXT_LOCALE", newLocale, { path: "/" });
      setSelectedLang(newLocale);
      const currentPath = window.location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
      const queryString = window.location.search || "";
      const newPath = `/${newLocale}${currentPath}${queryString}`;
      window.location.href = newPath;
    } catch (error) {
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // --------- Normalizasiya ----------
  const { roots, allCategories } = useMemo(() => {
    const map = new Map();
    const add = (cat) => {
      if (!cat || !cat.id) return;
      if (!map.has(cat.id)) map.set(cat.id, cat);
    };
    (categoryData || []).forEach((cat) => {
      add(cat);
      if (Array.isArray(cat.parent_id)) cat.parent_id.forEach((p) => add(p));
    });
    const all = Array.from(map.values());
    const potentialRoots = all.filter((c) => {
      if (!c.hasOwnProperty("parent_id")) return true;
      if (!c.parent_id) return true;
      if (Array.isArray(c.parent_id) && c.parent_id.length === 0) return true;
      return false;
    });
    return { roots: potentialRoots, allCategories: all };
  }, [categoryData]);

  const getChildrenForRoot = (rootId) =>
    allCategories.filter(
      (cat) => Array.isArray(cat.parent_id) && cat.parent_id.some((p) => p.id === rootId)
    );

  const buildIconSrc = (iconPath) =>
    iconPath ? `https://admin.adentta.az/storage${iconPath}` : null;

  return (
    <>
      <div className="container">
        <div className="headerMenu">
          <div className="headerMenuLeft">
            <Link
              className="logo"
              href="/"
              style={isHomePage ? { pointerEvents: "none" } : undefined}
            >
              <img src="/images/logo.svg" alt="Adentta" />
            </Link>
          </div>

          <div className="mobileMenuIcon" onClick={toggleMobileMenu}>
            <img
              src={
                isMobileMenuOpen
                  ? "/icons/popupCloseIcon.svg"
                  : "/icons/mobileMenuIcon.svg"
              }
              alt="Menu Icon"
            />
          </div>

          {isMobileMenuOpen && (
            <MobileMenu
              t={t}
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
              categoryData={categoryData} 
            />
          )}

          <div className="headerMenuItem">
            <nav>
              <ul>
                <div className="dropdown">
                  <li>
                    <Link className="productsLinkName" href="/products">
                      {t?.products || "products"}
                    </Link>
                    <img className="bottomDown" src="/icons/bottomDown.svg" alt="" />
                    <div className="dropdown-content">
                      <div className="dropHeader">
                        <h4>{t?.megaMenuTitle || "Categories"}</h4>
                      </div>
                      <div className="rower">
                        <div className="row">
                          <div className="xl-12 lg-12">
                            <div className="rowerd">
                              {roots.length === 0 ? (
                                <div className="column">
                                  <h3>{t?.noCategories || "No categories"}</h3>
                                </div>
                              ) : (
                                roots.map((category) => {
                                  const children = getChildrenForRoot(category.id);
                                  const iconSrc = `https://admin.adentta.az/storage${category.icon}`;
                                  return (
                                    <div key={category.id} className="column">
                                      <Link href={buildCategoryHref(category)}>
                                        <div className="columnHeader">
                                          {iconSrc ? (
                                            <img src={iconSrc} alt={category.title || ""} />
                                          ) : null}
                                          <span>{category.title}</span>
                                        </div>
                                      </Link>
                                      <div className="columnLinks">
                                        {children.slice(0, 5).map((child) => (
                                          <Link
                                            key={child.id}
                                            href={buildCategoryHref(child)}
                                            className="subLink"
                                          >
                                            {child.title}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>

                <div className="dropdownCompany">
                  <li>
                    <Link className="productsLinkName" href="/about">
                      {t?.company || "company"}
                    </Link>
                    <img className="bottomDown" src="/icons/bottomDown.svg" alt="" />
                    <div className="dropdown-contentCompany">
                      <div className="dropCompany">
                        <ul>
                          <li><Link href="/about">{t?.aboutCompany || " About Company"}</Link></li>
                          <li><Link href="/team">{t?.team || "Team"}</Link></li>
                          <li><Link href="/brands">{t?.brands || " Brands"}</Link></li>
                          <li><Link href="/careers">{t?.careers || " Careers"}</Link></li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </div>

                <li>
                  <Link className="productsLinkName" href="/events">
                    {t?.events || "Events"}
                  </Link>
                </li>

                <div className="dropdownMedia">
                  <li>
                    <Link className="productsLinkName" href="#">
                      {t?.media || "Media"}
                    </Link>
                    <img className="bottomDown" src="/icons/bottomDown.svg" alt="" />
                    <div className="dropdown-contentMedia">
                      <div className="dropMedia">
                        <ul>
                          <li><Link href="/blogs">{t?.blogs || "Blogs"}</Link></li>
                          <li><Link href="/videogalery">{t?.video || "VideoGalery"}</Link></li>
                          <li><Link href="/catalog">{t?.pdfCatalog || "PDF Catalog"}</Link></li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </div>

                <li>
                  <Link className="productsLinkName" href="/contact">
                    {t?.contact || "Contact us"}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="headerMenuRight">
            <div className="changeLang" onClick={toggleMenu}>
              <div className="looops">
                <span>{selectedLang}</span>
                <img src="/icons/bottomDown.svg" alt="Toggle Language" />
              </div>

              {isOpen && (
                <div className="langOptions">
                  {selectedLang !== "az" && (
                    <button onClick={() => handleLanguageChange("az")}>az</button>
                  )}
                  {selectedLang !== "en" && (
                    <button onClick={() => handleLanguageChange("en")}>en</button>
                  )}
                  {selectedLang !== "ru" && (
                    <button onClick={() => handleLanguageChange("ru")}>ru</button>
                  )}
                </div>
              )}
            </div>
            <button onClick={togglePopup} className="searchButton">
              <HeaderSearchIcon className="searchIconHead" />
            </button>

            {isPopupOpen && (
              <SearchPopup t={t} closePopup={() => setIsPopupOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;




















// !    BURDA HER SEY QAYDASINDADIR (ID) ILE GELIR DATA   04.11.25
// "use client";
// import Link from "next/link";
// import React, { useState, useEffect, useMemo } from "react";
// import SearchPopup from "../SearchPopup";
// import Image from "next/image";
// import MobileMenu from "@/components/MobileMenu";
// import HeaderSearchIcon from "../../../public/icons/searchIcon.svg";
// import Cookies from "js-cookie";

// // --- Helper: slugify və href yaradıcısı ---
// // Qeyd: category obyektində `url_slug` və ya `slug` sahəsi varsa onları istifadə edəcəyik.
// // Əgər yoxdur isə `title`-dan slug yaradılacaq.
// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD") // diakritikləri ayırmaq üçün
//     .replace(/[\u0300-\u036f]/g, "") // diakritikləri götür
//     .replace(/[^a-z0-9-]+/g, "-") // hərf/rəqəm olmayanları tire ilə əvəz et
//     .replace(/--+/g, "-") // artıqlıq tireləri azalat
//     .replace(/^-+|-+$/g, ""); // başlanğıc/son tireləri sil
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ?? cat?.slug ?? cat?.url ?? cat?.urlSlug ?? slugify(cat?.title ?? "");

// const buildCategoryHref = (cat) => {
//   const slug = getCategorySlug(cat) || String(cat?.id ?? "");
//   // nəticə: /product-page?category=slug-id
//   // return `/products?category=${encodeURIComponent(slug)}`;
//   // ! köhnə versiya:   DIQQETLI OLMALISAN BURADA
//    return `/product-page?category=${encodeURIComponent(slug)}-${encodeURIComponent(
//     String(cat?.id ?? "")
//   )}`;
// };

// const HeaderMenu = ({ t, categoryData = [], isHomePage }) => {
//   const [selectedLang, setSelectedLang] = useState("az");

//   useEffect(() => {
//     const storedLang = Cookies.get("NEXT_LOCALE");
//     if (storedLang) {
//       setSelectedLang(storedLang);
//     }
//   }, []);

//   const handleLanguageChange = (lang) => {
//     const newLocale = lang;
//     if (!newLocale || newLocale === selectedLang) return;

//     try {
//       Cookies.set("NEXT_LOCALE", newLocale, { path: "/" });
//       setSelectedLang(newLocale);

//       const currentPath = window.location.pathname.replace(
//         /^\/[a-z]{2}(?=\/|$)/,
//         ""
//       );
//       const queryString = window.location.search || "";
//       const newPath = `/${newLocale}${currentPath}${queryString}`;
//       window.location.href = newPath;
//     } catch (error) {
//       console.error("Language change error:", error);
//     }
//   };

//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);
//   const togglePopup = () => setIsPopupOpen(!isPopupOpen);
//   const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

//   // --------- Normalizasiya (API nümunəsinə uyğun) ----------
//   const { roots, allCategories } = useMemo(() => {
//     const map = new Map();

//     const add = (cat) => {
//       if (!cat || !cat.id) return;
//       if (!map.has(cat.id)) {
//         map.set(cat.id, cat);
//       }
//     };

//     (categoryData || []).forEach((cat) => {
//       add(cat);
//       if (Array.isArray(cat.parent_id)) {
//         cat.parent_id.forEach((p) => add(p));
//       }
//     });

//     const all = Array.from(map.values());

//     const potentialRoots = all.filter((c) => {
//       if (!c.hasOwnProperty("parent_id")) return true;
//       if (!c.parent_id) return true;
//       if (Array.isArray(c.parent_id) && c.parent_id.length === 0) return true;
//       return false;
//     });

//     return { roots: potentialRoots, allCategories: all };
//   }, [categoryData]);

//   const getChildrenForRoot = (rootId) => {
//     return allCategories.filter((cat) =>
//       Array.isArray(cat.parent_id) && cat.parent_id.some((p) => p.id === rootId)
//     );
//   };

//   const buildIconSrc = (iconPath) =>
//     iconPath ? `https://admin.adentta.az/storage${iconPath}` : null;

//   return (
//     <>
//       <div className="container">
//         <div className="headerMenu">
//           <div className="headerMenuLeft">
//             <Link
//               className="logo"
//               href="/"
//               style={isHomePage ? { pointerEvents: "none" } : undefined}
//             >
//               <img src="/images/logo.svg" alt="Adentta" />
//             </Link>
//           </div>

//           <div className="mobileMenuIcon" onClick={toggleMobileMenu}>
//             <img
//               src={
//                 isMobileMenuOpen
//                   ? "/icons/popupCloseIcon.svg"
//                   : "/icons/mobileMenuIcon.svg"
//               }
//               alt="Menu Icon"
//             />
//           </div>

//           {isMobileMenuOpen && (
//             <MobileMenu
//               t={t}
//               isOpen={isMobileMenuOpen}
//               setIsOpen={setIsMobileMenuOpen}
//             />
//           )}

//           <div className="headerMenuItem">
//             <nav>
//               <ul>
//                 <div className="dropdown">
//                   <li>
//                     <Link className="productsLinkName" href="#">
//                       {t?.products || "products"}
//                     </Link>
//                     <img
//                       className="bottomDown"
//                       src="/icons/bottomDown.svg"
//                       alt=""
//                     />
//                     <div className="dropdown-content">
//                       <div className="dropHeader">
//                         <h4>{t?.megaMenuTitle || "Categories"}</h4>
//                       </div>
//                       <div className="rower">
//                         <div className="row">
//                           <div className="xl-12 lg-12">
//                             <div className="rowerd">
//                               {roots.length === 0 ? (
//                                 <div className="column">
//                                   <h3>{t?.noCategories || "No categories"}</h3>
//                                 </div>
//                               ) : (
                                
//                                 roots.map((category) => {
//                                   const children = getChildrenForRoot(category.id);
//                                   // const iconSrc = buildIconSrc(category.icon);
//                                   const iconSrc = `https://admin.adentta.az/storage${category.icon}`;


//                                   return (
//                                     <div key={category.id} className="column">
//                                       <Link
//                                         href={buildCategoryHref(category)}
//                                       >
//                                         <h3>
//                                           {iconSrc ? (
//                                             <img
//                                               src={iconSrc}
//                                               alt={category.title || ""}
//                                             />
//                                           ) : null}
//                                           <span>{category.title}</span>
//                                         </h3>
//                                       </Link>

//                                       <div className="columnLinks">
//                                         {children.slice(0, 5).map((child) => (
//                                           <Link
//                                             key={child.id}
//                                             href={buildCategoryHref(child)}
//                                             className="subLink"
//                                           >
//                                             {child.title}
//                                           </Link>
//                                         ))}
//                                       </div>
//                                     </div>
//                                   );
//                                 })
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 </div>

//                 <div className="dropdownCompany">
//                   <li>
//                     <Link className="productsLinkName" href="#">
//                       {t?.company || "company"}
//                     </Link>
//                     <img
//                       className="bottomDown"
//                       src="/icons/bottomDown.svg"
//                       alt=""
//                     />
//                     <div className="dropdown-contentCompany">
//                       <div className="dropCompany">
//                         <ul>
//                           <li>
//                             <Link href="/about">
//                               {t?.aboutCompany || " About Company"}
//                             </Link>
//                           </li>
//                           <li>
//                             <Link href="/team">{t?.team || "Team"}</Link>
//                           </li>
//                           <li>
//                             <Link href="/brands">{t?.brands || " Brands"}</Link>
//                           </li>
//                           <li>
//                             <Link href="/careers">
//                               {t?.careers || " Careers"}
//                             </Link>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </li>
//                 </div>
//                 <li>
//                   <Link className="productsLinkName" href="/events">
//                     {t?.events || "Events"}
//                   </Link>
//                 </li>
//                 <div className="dropdownMedia">
//                   <li>
//                     <Link className="productsLinkName" href="#">
//                       {t?.media || "Media"}
//                     </Link>
//                     <img
//                       className="bottomDown"
//                       src="/icons/bottomDown.svg"
//                       alt=""
//                     />
//                     <div className="dropdown-contentMedia">
//                       <div className="dropMedia">
//                         <ul>
//                           <li>
//                             <Link href="/blogs">{t?.blogs || "Blogs"}</Link>
//                           </li>
//                           <li>
//                             <Link href="/videogalery">
//                               {t?.video || "VideoGalery"}
//                             </Link>
//                           </li>
//                           <li>
//                             <Link href="/catalog">
//                               {t?.pdfCatalog || "PDF Catalog"}
//                             </Link>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </li>
//                 </div>
//                 <li>
//                   <Link className="productsLinkName" href="/contact">
//                     {t?.contact || "Contact us"}
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           <div className="headerMenuRight">
//             <div className="changeLang" onClick={toggleMenu}>
//               <div className="looops">
//                 <span>{selectedLang}</span>
//                 <img src="/icons/bottomDown.svg" alt="Toggle Language" />
//               </div>

//               {isOpen && (
//                 <div className="langOptions">
//                   {selectedLang !== "az" && (
//                     <button onClick={() => handleLanguageChange("az")}>az</button>
//                   )}
//                   {selectedLang !== "en" && (
//                     <button onClick={() => handleLanguageChange("en")}>en</button>
//                   )}
//                   {selectedLang !== "ru" && (
//                     <button onClick={() => handleLanguageChange("ru")}>ru</button>
//                   )}
//                 </div>
//               )}
//             </div>
//             <button onClick={togglePopup} className="searchButton">
//               <HeaderSearchIcon className="searchIconHead" />
//             </button>

//             {isPopupOpen && (
//               <SearchPopup t={t} closePopup={() => setIsPopupOpen(false)} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeaderMenu;
