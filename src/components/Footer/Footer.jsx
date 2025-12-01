import Link from "next/link";
import React from "react";
import FooterBottom from "./FooterBottom";
import Image from "next/image";
import WhatsApp from "../../../public/icons/whatsapp.svg";
import Linkedin from "../../../public/icons/linkedin.svg";
import Instagram from "../../../public/icons/instagram.svg";
import Facebook from "../../../public/icons/facebook.svg";
import axiosInstance from "@/lib/axios";

async function getTranslations() {
  try {
    const { data } = await axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

const Footer = async ({
  contact,
  brandsData,
  eventsData,
  categoryData,
  isHomePage,
}) => {
  const t = await getTranslations();
  const contactData = contact?.data || {};

  return (
    <footer id="footer">
      <div className="container footer">
        <div className="footerContent">
          {/* Brand & Sosyal */}
          <div className="footerBrand">
            <Link
              href="/"
              style={isHomePage ? { pointerEvents: "none" } : undefined}
            >
              <Image
                src="/images/footerLogo.svg"
                alt="adentta"
                width={200}
                height={200}
                className="footerLogo"
              />
            </Link>
            <p>{t?.footerSeoText || "No results found"}</p>
            <div className="socialIcons">
              <ul>
                <li>
                  <Link href={contactData?.whatsapp_link} target="_blank">
                    <WhatsApp />
                  </Link>
                </li>
                <li>
                  <Link href={contactData?.linkedin} target="_blank">
                    <Linkedin />
                  </Link>
                </li>
                <li>
                  <Link href={contactData?.instagram} target="_blank">
                    <Instagram />
                  </Link>
                </li>
                <li>
                  <Link href={contactData?.facebook} target="_blank">
                    <Facebook />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="contactButtons">
              <Link href={`tel:${contactData.phone || "+994554099878"}`}>
                <div className="contactButtonCall">
                  <Image
                    src="/icons/phoneicon.svg"
                    alt="adentta"
                    width={200}
                    height={200}
                  />
                  <button>{t.call || "Call us"}</button>
                </div>
              </Link>
              <Link href={`mailto:${contactData.email || "info@adentta.com"}`}>
                <div className="contactButtonEmail">
                  <Image
                    src="/icons/email.svg"
                    alt="adentta"
                    width={200}
                    height={200}
                  />
                  <button>{t.email || "Email us"}</button>
                </div>
              </Link>
            </div>
          </div>

          {/* Products (kategori filtreli) */}
          <div className="footerLinks">
            <Link href="/product">
              <span>{t.products || "Products"}</span>
            </Link>
            <ul>
              {categoryData?.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={{
                      pathname: "/product",
                      query: { category: category.url_slug },
                    }}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div className="footerLinks">
            <Link href="/brands">
              <span>{t.brands || "Brands"}</span>
            </Link>
            <ul>
              {brandsData?.slice(0, 6).map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={`/brands/${brand?.title
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}-${brand.id}`}
                  >
                    {brand.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div className="footerLinks">
            <Link href="/events">
              <span>{t.events || "Events"}</span>
            </Link>
            <ul>
              {eventsData?.slice(0, 6).map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/events/${event?.title
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}-${event.id}`}
                  >
                    {event.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footerLinks">
            {/* <Link href="/about" className="notLink">
            </Link> */}
              <span>{t.company || "Company"}</span>
            <ul>
              <li>
                <Link href="/about">{t.aboutCompany || "About"}</Link>
              </li>
              <li>
                <Link href="/mission">{t.mission || "Our Mission"}</Link>
              </li>
              <li>
                <Link href="/team">{t.team || "Teams"}</Link>
              </li>
              {/* <li>
                <Link href="/doctors">{t.doctors || "Doctors"}</Link>
              </li> */}
              {/* <li>
                <Link href="/brands">{t.brands || "Brands"}</Link>
              </li> */}
              <li>
                <Link href="/careers">{t.careers || "Careers"}</Link>
              </li>
              <li>
                <Link href="/contact">{t.contact || "Contact US"}</Link>
              </li>
            </ul>
          </div>

          {/* Media */}
          <div className="footerLinks">
            {/* <Link href="#" className="notLink">
              <h3>{t.media || "Media"}</h3>
            </Link> */}

            <span>{t.media || "Media"}</span>

            <ul>
              <li>
                <Link href="/blogs">{t.blogs || "Blogs"}</Link>
              </li>
              <li>
                <Link href="/videogalery">{t.video || "Video Gallery"}</Link>
              </li>
              <li>
                <Link href="/catalog">{t.pdfCatalog || "PDF Catalog"}</Link>
              </li>
            </ul>
          </div>
        </div>

        <FooterBottom t={t} />
      </div>
    </footer>
  );
};

export default Footer;
//! Footer son versiya
