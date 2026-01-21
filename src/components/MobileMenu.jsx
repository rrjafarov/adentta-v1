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
























import Link from "next/link";
import React, { useState, useMemo, useEffect, useRef } from "react";
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
      {isOpen && (
        <div 
          className="mobileAccordionContent" 
          style={{ 
            maxHeight: '250px', 
            overflowY: 'auto',
            scrollbarWidth: 'thin'
          }}
        >
          <style jsx>{`
            .mobileAccordionContent::-webkit-scrollbar {
              width: 2px;
            }
            .mobileAccordionContent::-webkit-scrollbar-track {
              background: transparent;
            }
            .mobileAccordionContent::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 2px;
            }
            .mobileAccordionContent::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}</style>
          {children}
        </div>
      )}
    </div>
  );
};

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

const MobileMenu = ({ t, isOpen, setIsOpen, categoryData = [] }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const router = useRouter();
  const scrollPositionRef = useRef(0);

  // Body scroll-unu blokla/aç (real scroll-lock)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      // hazırkı scroll mövqeyini yadda saxla
      scrollPositionRef.current =
        window.scrollY || window.pageYOffset || 0;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      // bədəni normal hala qaytar
      const storedScrollY = scrollPositionRef.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";

      if (storedScrollY) {
        window.scrollTo(0, storedScrollY);
      }
    }

    // Cleanup: komponent unmount olduqda scroll-u geri qaytar
    return () => {
      const storedScrollY = scrollPositionRef.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";

      if (storedScrollY) {
        window.scrollTo(0, storedScrollY);
      }
    };
  }, [isOpen]);

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

    const currentPath =
      window.location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
    const queryString = window.location.search || "";

    let newPath =
      lang === "az"
        ? `/az${currentPath}${queryString}`
        : `/${lang}${currentPath}${queryString}`;

    if (newPath) {
      router.replace(newPath).catch(() => {
        window.location.assign(newPath);
      });
      router.refresh();
    }
  };

  // --------- Normalizasiya (HeaderMenu-dan eyni) ----------
  const { roots } = useMemo(() => {
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
    return { roots: potentialRoots };
  }, [categoryData]);

  return (
    <>
      {isOpen && <div className="overlaye" onClick={closeMenu}></div>}
      {isOpen && (
        <div className="mobileMenu">
          <div className="mobileMenuItem">
            {/* MƏHSULLAR (Products) - Dinamik Kateqoriyalar */}
            <MobileAccordion
              title={t?.products || "products"}
              showIcon={true}
              isOpen={openAccordion === "products"}
              onClick={() => toggleAccordion("products")}
            >
              <ul>
                <li>
                  {roots.length === 0 ? (
                    <span>{t?.noCategories || "No categories"}</span>
                  ) : (
                    roots.map((category) => {
                      const iconSrc = category.icon
                        ? `https://admin.adentta.az/storage${category.icon}`
                        : null;

                      return (
                        <Link
                          key={category.id}
                          href={buildCategoryHref(category)}
                          onClick={closeMenu}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {iconSrc && (
                            <img
                              src={iconSrc}
                              alt={category.title || ""}
                              style={{ width: "20px", height: "20px" }}
                            />
                          )}
                          <span>{category.title}</span>
                        </Link>
                      );
                    })
                  )}
                </li>
              </ul>
            </MobileAccordion>

            {/* ŞİRKƏT (Company) */}
            <MobileAccordion
              title={t?.company || "company"}
              showIcon={true}
              isOpen={openAccordion === "company"}
              onClick={() => toggleAccordion("company")}
            >
              <ul>
                <li>
                  <Link href="/about" onClick={closeMenu}>
                    {t?.aboutCompany || "About Company"}
                  </Link>
                  <Link href="/team" onClick={closeMenu}>
                    {t?.team || "Team"}
                  </Link>
                  <Link href="/brands" onClick={closeMenu}>
                    {t?.brands || "Brands"}
                  </Link>
                  <Link href="/careers" onClick={closeMenu}>
                    {t?.careers || "Careers"}
                  </Link>
                </li>
              </ul>
            </MobileAccordion>

            {/* TƏDBİRLƏR (Events) */}
            <Link href="/events" onClick={closeMenu}>
              <span>{t?.events || "Events"}</span>
            </Link>

            {/* MEDİA */}
            <MobileAccordion
              title={t?.media || "Media"}
              showIcon={true}
              isOpen={openAccordion === "media"}
              onClick={() => toggleAccordion("media")}
            >
              <ul>
                <li>
                  <Link href="/blogs" onClick={closeMenu}>
                    {t?.blogs || "Blogs"}
                  </Link>
                  <Link href="/videogalery" onClick={closeMenu}>
                    {t?.video || "VideoGalery"}
                  </Link>
                  <Link href="/catalog" onClick={closeMenu}>
                    {t?.pdfCatalog || "PDF Catalog"}
                  </Link>
                </li>
              </ul>
            </MobileAccordion>

            {/* ƏLAQƏ (Contact) */}
            <Link href="/contact" onClick={closeMenu}>
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
































// import Link from "next/link";
// import React, { useState, useMemo, useEffect } from "react";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

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
//       {isOpen && (
//         <div 
//           className="mobileAccordionContent" 
//           style={{ 
//             maxHeight: '200px', 
//             overflowY: 'auto',
//             scrollbarWidth: 'thin'
//           }}
//         >
//           <style jsx>{`
//             .mobileAccordionContent::-webkit-scrollbar {
//               width: 2px;
//             }
//             .mobileAccordionContent::-webkit-scrollbar-track {
//               background: transparent;
//             }
//             .mobileAccordionContent::-webkit-scrollbar-thumb {
//               background: #888;
//               border-radius: 2px;
//             }
//             .mobileAccordionContent::-webkit-scrollbar-thumb:hover {
//               background: #555;
//             }
//           `}</style>
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// // --- Helper: slugify & slug getter ---
// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ?? cat?.slug ?? cat?.url ?? cat?.urlSlug ?? slugify(cat?.title ?? "");

// // YALNIZ SLUG (ID YOX)
// const buildCategoryHref = (cat) => {
//   const slug = getCategorySlug(cat) || slugify(String(cat?.title ?? ""));
//   return `/product?category=${encodeURIComponent(slug)}`;
// };

// const MobileMenu = ({ t, isOpen, setIsOpen, categoryData = [] }) => {
//   const [openAccordion, setOpenAccordion] = useState(null);
//   const router = useRouter();

//   // Body scroll-unu blokla/aç
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     // Cleanup: komponent unmount olduqda scroll-u geri qaytar
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   const toggleAccordion = (accordion) => {
//     setOpenAccordion(openAccordion === accordion ? null : accordion);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//   };

//   const handleLangChange = (lang) => {
//     const currentLang = Cookies.get("NEXT_LOCALE") || "az";
//     if (lang === currentLang) {
//       return;
//     }

//     Cookies.set("NEXT_LOCALE", lang);

//     const currentPath = window.location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
//     const queryString = window.location.search || "";

//     let newPath = lang === "az"
//       ? `/az${currentPath}${queryString}`
//       : `/${lang}${currentPath}${queryString}`;

//     if (newPath) {
//       router.replace(newPath).catch(() => {
//         window.location.assign(newPath);
//       });
//       router.refresh();
//     }
//   };

//   // --------- Normalizasiya (HeaderMenu-dan eyni) ----------
//   const { roots } = useMemo(() => {
//     const map = new Map();
//     const add = (cat) => {
//       if (!cat || !cat.id) return;
//       if (!map.has(cat.id)) map.set(cat.id, cat);
//     };
//     (categoryData || []).forEach((cat) => {
//       add(cat);
//       if (Array.isArray(cat.parent_id)) cat.parent_id.forEach((p) => add(p));
//     });
//     const all = Array.from(map.values());
//     const potentialRoots = all.filter((c) => {
//       if (!c.hasOwnProperty("parent_id")) return true;
//       if (!c.parent_id) return true;
//       if (Array.isArray(c.parent_id) && c.parent_id.length === 0) return true;
//       return false;
//     });
//     return { roots: potentialRoots };
//   }, [categoryData]);

//   return (
//     <>
//       {isOpen && <div className="overlaye" onClick={closeMenu}></div>}
//       {isOpen && (
//         <div className="mobileMenu">
//           <div className="mobileMenuItem">
            
//             {/* MƏHSULLAR (Products) - Dinamik Kateqoriyalar */}
//             <MobileAccordion
//               title={t?.products || "products"}
//               showIcon={true}
//               isOpen={openAccordion === "products"}
//               onClick={() => toggleAccordion("products")}
//             >
//               <ul>
//                 <li>
//                   {roots.length === 0 ? (
//                     <span>{t?.noCategories || "No categories"}</span>
//                   ) : (
//                     roots.map((category) => {
//                       const iconSrc = category.icon 
//                         ? `https://admin.adentta.az/storage${category.icon}` 
//                         : null;
                      
//                       return (
//                         <Link 
//                           key={category.id} 
//                           href={buildCategoryHref(category)}
//                           onClick={closeMenu}
//                           style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
//                         >
//                           {iconSrc && (
//                             <img 
//                               src={iconSrc} 
//                               alt={category.title || ""} 
//                               style={{ width: '20px', height: '20px' }}
//                             />
//                           )}
//                           <span>{category.title}</span>
//                         </Link>
//                       );
//                     })
//                   )}
//                 </li>
//               </ul>
//             </MobileAccordion>

//             {/* ŞİRKƏT (Company) */}
//             <MobileAccordion
//               title={t?.company || "company"}
//               showIcon={true}
//               isOpen={openAccordion === "company"}
//               onClick={() => toggleAccordion("company")}
//             >
//               <ul>
//                 <li>
//                   <Link href="/about" onClick={closeMenu}>
//                     {t?.aboutCompany || "About Company"}
//                   </Link>
//                   <Link href="/team" onClick={closeMenu}>
//                     {t?.team || "Team"}
//                   </Link>
//                   <Link href="/brands" onClick={closeMenu}>
//                     {t?.brands || "Brands"}
//                   </Link>
//                   <Link href="/careers" onClick={closeMenu}>
//                     {t?.careers || "Careers"}
//                   </Link>
//                 </li>
//               </ul>
//             </MobileAccordion>

//             {/* TƏDBİRLƏR (Events) */}
//             <Link href="/events" onClick={closeMenu}>
//               <span>{t?.events || "Events"}</span>
//             </Link>

//             {/* MEDİA */}
//             <MobileAccordion
//               title={t?.media || "Media"}
//               showIcon={true}
//               isOpen={openAccordion === "media"}
//               onClick={() => toggleAccordion("media")}
//             >
//               <ul>
//                 <li>
//                   <Link href="/blogs" onClick={closeMenu}>
//                     {t?.blogs || "Blogs"}
//                   </Link>
//                   <Link href="/videogalery" onClick={closeMenu}>
//                     {t?.video || "VideoGalery"}
//                   </Link>
//                   <Link href="/catalog" onClick={closeMenu}>
//                     {t?.pdfCatalog || "PDF Catalog"}
//                   </Link>
//                 </li>
//               </ul>
//             </MobileAccordion>

//             {/* ƏLAQƏ (Contact) */}
//             <Link href="/contact" onClick={closeMenu}>
//               <span>{t?.contact || "Contact us"}</span>
//             </Link>

//             {/* DİL DƏYİŞMƏ BUTONLARI */}
//             <div className="mobileLangChange">
//               <button onClick={() => handleLangChange("az")}>AZ</button>
//               <div></div>
//               <button onClick={() => handleLangChange("ru")}>RU</button>
//               <div></div>
//               <button onClick={() => handleLangChange("en")}>EN</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileMenu;












// // !son versiya
// import Link from "next/link";
// import React, { useState } from "react";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

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
//   const router = useRouter();

//   const toggleAccordion = (accordion) => {
//     setOpenAccordion(openAccordion === accordion ? null : accordion);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//   };

//   const handleLangChange = (lang) => {
//     const currentLang = Cookies.get("NEXT_LOCALE") || "az";
//     if (lang === currentLang) {
//       return;
//     }

//     Cookies.set("NEXT_LOCALE", lang);

//     const currentPath = window.location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
//     const queryString = window.location.search || "";

//     let newPath = lang === "az"
//       ? `/az${currentPath}${queryString}`
//       : `/${lang}${currentPath}${queryString}`;

//     if (newPath) {
//       router.replace(newPath).catch(() => {
//         window.location.assign(newPath);
//       });
//       router.refresh();
//     }
//   };

//   return (
//     <>
//       {isOpen && <div className="overlaye" onClick={closeMenu}></div>}
//       {isOpen && (
//         <div className="mobileMenu">
//           <div className="mobileMenuItem">
//             <Link href="/product">
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

//             {/* <Link href="/doctors">
//               <span>{t?.doctors || "Doctors"}</span>
//             </Link> */}
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

//             {/* DİL DƏYİŞMƏ BUTONLARI */}
//             <div className="mobileLangChange">
//               <button onClick={() => handleLangChange("az")}>AZ</button>
//               <div></div>
//               <button onClick={() => handleLangChange("ru")}>RU</button>
//               <div></div>
//               <button onClick={() => handleLangChange("en")}>EN</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileMenu;

// // !son versiya