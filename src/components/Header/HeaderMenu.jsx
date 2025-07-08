// !son veriya
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import SearchPopup from "../SearchPopup";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";
import HeaderSearchIcon from "../../../public/icons/searchIcon.svg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const HeaderMenu = ({ t, categoryData, isHomePage }) => {
 const [selectedLang, setSelectedLang] = useState("az");

  useEffect(() => {
    const storedLang = Cookies.get("NEXT_LOCALE");
    if (storedLang) {
      setSelectedLang(storedLang);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    const newLocale = lang;
    if (!newLocale || newLocale === selectedLang) return;

    try {
      Cookies.set("NEXT_LOCALE", newLocale, { path: "/" });
      setSelectedLang(newLocale);

      const currentPath = window.location.pathname.replace(
        /^\/[a-z]{2}(?=\/|$)/,
        ""
      );
      const queryString = window.location.search || "";
      const newPath = `/${newLocale}${currentPath}${queryString}`;
      window.location.href = newPath;
    } catch (error) {
      console.error("Language change error:", error);
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

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
            />
          )}

          <div className="headerMenuItem">
            <nav>
              <ul>
                <div className="dropdown">
                  <li>
                    <Link className="productsLinkName" href="#">
                      {t?.products || "products"}
                    </Link>
                    <img
                      className="bottomDown"
                      src="/icons/bottomDown.svg"
                      alt=""
                    />
                    <div className="dropdown-content">
                      <div className="dropHeader">
                        <h4>{t?.megaMenuTitle || "Categories"}</h4>
                      </div>
                      <div className="rower">
                        <div className="row">
                          {/* <div className="xl-3 lg-3">
                            <div className="column">
                              <div className="productDropMenuImages">
                                <Image
                                  src="/images/dropdownProductImg.png"
                                  alt="product"
                                  width={100}
                                  height={100}
                                />
                                <div className="productDropMenuImagesText">
                                  <Link
                                    href="/products"
                                    className="dropProductLinks"
                                  >
                                    <span>
                                      {t?.megaMenuSeeAllProducts ||
                                        "see all products"}
                                    </span>
                                    <Image
                                      src="/icons/arrowTopRight.svg"
                                      alt="products"
                                      width={1}
                                      height={1}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="dropLine"></div>
                          </div> */}

                          <div className="xl-12 lg-12">
                            {/* <div className="rowerd">
                              {categoryData?.slice(0, 6).map((category) => (
                                <div key={category.id} className="column">
                                  <Link
                                    href={{
                                      pathname: "/products",
                                      query: { category: category.id },
                                    }}
                                  >
                                    <h3>
                                      <img
                                        src={`https://admin.adentta.az/storage${category.icon}`}
                                        alt="category"
                                      />
                                      <span>{category.title}</span>
                                    </h3>
                                  </Link>
                                  <div className="columnLinks">
                                    <Link href="#">{category?.parent_i?.title}</Link>
                                  </div>
                                </div>
                              ))}
                            </div> */}


                            
                            <div className="rowerd">
                              {categoryData
                                // .filter((category) => !category.parent_id).slice(0,6)
                                .filter((category) => !category.parent_id)
                                .map((category) => {
                                  const children = categoryData.filter((sub) =>
                                    sub.parent_id?.some(
                                      (p) => p.id === category.id
                                    )
                                  );

                                  return (
                                    <div key={category.id} className="column">
                                      {/* Üst kateqoriya adı */}
                                      <Link
                                        href={{
                                          pathname: "/products",
                                          // query: { category: category.id },
                                          query: { category: category.url_slug },
                                        }}
                                      >
                                        <h3>
                                          <img
                                            src={`https://admin.adentta.az/storage${category.icon}`}
                                            alt={category.title}
                                          />
                                          <span>{category.title}</span>
                                        </h3>
                                      </Link>

                                      {/* Alt kateqoriyalar */}
                                      <div className="columnLinks">
                                        {children.slice(0,5).map((child) => (
                                          <Link
                                            key={child.id}
                                            href={{
                                              pathname: "/products",
                                              query: {
                                                // category: category.id,
                                                // subcategory: child.id,
                                                category: category.url_slug,
                                                subcategory: child.url_slug,
                                              },
                                            }}
                                            className="subLink"
                                          >
                                            {child.title}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>

                <div className="dropdownCompany">
                  <li>
                    <Link className="productsLinkName" href="#">
                      {t?.company || "company"}
                    </Link>
                    <img
                      className="bottomDown"
                      src="/icons/bottomDown.svg"
                      alt=""
                    />
                    <div className="dropdown-contentCompany">
                      <div className="dropCompany">
                        <ul>
                          <li>
                            <Link href="/about">
                              {t?.aboutCompany || " About Company"}
                            </Link>
                          </li>
                          <li>
                            <Link href="/team">{t?.team || "Team"}</Link>
                          </li>
                          <li>
                            <Link href="/brands">{t?.brands || " Brands"}</Link>
                          </li>
                          <li>
                            <Link href="/careers">
                              {t?.careers || " Careers"}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </div>
                <li>
                  <Link className="productsLinkName" href="/doctors">
                    {t?.doctors || "Doctors"}
                  </Link>
                </li>
                <li>
                  <Link className="productsLinkName" href="/events">
                    {t?.events || "Events"}
                  </Link>
                </li>
                <div className="dropdownMedia">
                  <li>
                    <Link className="productsLinkName" href="/">
                      {t?.media || "Media"}
                    </Link>
                    <img
                      className="bottomDown"
                      src="/icons/bottomDown.svg"
                      alt=""
                    />
                    <div className="dropdown-contentMedia">
                      <div className="dropMedia">
                        <ul>
                          <li>
                            <Link href="/blogs">{t?.blogs || "Blogs"}</Link>
                          </li>
                          <li>
                            <Link href="/videogalery">
                              {t?.video || "VideoGalery"}
                            </Link>
                          </li>
                          <li>
                            <Link href="/catalog">
                              {t?.pdfCatalog || "PDF Catalog"}
                            </Link>
                          </li>
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

// !son veriya

// !

// !
