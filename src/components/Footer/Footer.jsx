// import Link from "next/link";
// import React from "react";
// import FooterBottom from "./FooterBottom";
// import Image from "next/image";
// import WhatsApp from "../../../public/icons/whatsapp.svg";
// import Linkedin from "../../../public/icons/linkedin.svg";
// import Instagram from "../../../public/icons/instagram.svg";
// import Facebook from "../../../public/icons/facebook.svg";

// const Footer =  ({
//   contact,
//   brandsData,
//   eventsData,
//   categoryData,
//   isHomePage,
//   t
// }) => {
//   const contactData = contact?.data || {};

//   return (
//     <footer id="footer">
//       <div className="container footer">
//         <div className="footerContent">
//           {/* Brand & Sosyal */}
//           <div className="footerBrand">
//             <Link
//               href="/"
//               style={isHomePage ? { pointerEvents: "none" } : undefined}
//             >
//               <Image
//                 src="/images/footerLogo.svg"
//                 alt="adentta"
//                 width={200}
//                 height={200}
//                 className="footerLogo"
//               />
//             </Link>
//             <p>{t?.footerSeoText || "No results found"}</p>
//             <div className="socialIcons">
//               <ul>
//                 <li>
//                   <Link href={contactData?.whatsapp_link} target="_blank">
//                     <WhatsApp />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href={contactData?.linkedin} target="_blank">
//                     <Linkedin />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href={contactData?.instagram} target="_blank">
//                     <Instagram />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href={contactData?.facebook} target="_blank">
//                     <Facebook />
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="contactButtons">
//               <Link href={`tel:${contactData.phone || "+994554099878"}`}>
//                 <div className="contactButtonCall">
//                   <Image
//                     src="/icons/phoneicon.svg"
//                     alt="adentta"
//                     width={200}
//                     height={200}
//                   />
//                   <button>{t.call || "Call us"}</button>
//                 </div>
//               </Link>
//               <Link href={`mailto:${contactData.email || "info@adentta.com"}`}>
//                 <div className="contactButtonEmail">
//                   <Image
//                     src="/icons/email.svg"
//                     alt="adentta"
//                     width={200}
//                     height={200}
//                   />
//                   <button>{t.email || "Email us"}</button>
//                 </div>
//               </Link>
//             </div>
//           </div>

//           {/* Products (kategori filtreli) */}
//           <div className="footerLinks">
//             <Link href="/products">
//               <span>{t.products || "Products"}</span>
//             </Link>
//             <ul>
//               {categoryData?.slice(0, 6).map((category) => (
//                 <li key={category.id}>
//                   <Link
//                     href={{
//                       pathname: "/products",
//                       query: { category: category.url_slug },
//                     }}
//                   >
//                     {category.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Brands */}
//           <div className="footerLinks">
//             <Link href="/brands">
//               <span>{t.brands || "Brands"}</span>
//             </Link>
//             <ul>
//               {brandsData?.slice(0, 6).map((brand) => (
//                 <li key={brand.id}>
//                   <Link
//                     href={`/brands/${brand?.title
//                       ?.toLowerCase()
//                       .replace(/\s+/g, "-")}-${brand.id}`}
//                   >
//                     {brand.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Events */}
//           <div className="footerLinks">
//             <Link href="/events">
//               <span>{t.events || "Events"}</span>
//             </Link>
//             <ul>
//               {eventsData?.slice(0, 6).map((event) => (
//                 <li key={event.id}>
//                   <Link
//                     href={`/events/${event?.title
//                       ?.toLowerCase()
//                       .replace(/\s+/g, "-")}-${event.id}`}
//                   >
//                     {event.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div className="footerLinks">
//               <span>{t.company || "Company"}</span>
//             <ul>
//               <li>
//                 <Link href="/about">{t.aboutCompany || "About"}</Link>
//               </li>
//               <li>
//                 <Link href="/mission">{t.mission || "Our Mission"}</Link>
//               </li>
//               <li>
//                 <Link href="/team">{t.team || "Teams"}</Link>
//               </li>
//               <li>
//                 <Link href="/careers">{t.careers || "Careers"}</Link>
//               </li>
//               <li>
//                 <Link href="/contact">{t.contact || "Contact US"}</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Media */}
//           <div className="footerLinks">

//             <span>{t.media || "Media"}</span>

//             <ul>
//               <li>
//                 <Link href="/blogs">{t.blogs || "Blogs"}</Link>
//               </li>
//               <li>
//                 <Link href="/videogalery">{t.video || "Video Gallery"}</Link>
//               </li>
//               <li>
//                 <Link href="/catalog">{t.pdfCatalog || "PDF Catalog"}</Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <FooterBottom t={t} />
//       </div>
//     </footer>
//   );
// };

// export default Footer;



























"use client";

import Link from "next/link";
import React from "react";
import FooterBottom from "./FooterBottom";
import { usePathname } from "next/navigation"; // ✅ əlavə edildi
import Image from "next/image";
import WhatsApp from "../../../public/icons/whatsapp.svg";
import Linkedin from "../../../public/icons/linkedin.svg";
import Instagram from "../../../public/icons/instagram.svg";
import Facebook from "../../../public/icons/facebook.svg";

const Footer = ({
  contact,
  brandsData,
  eventsData,
  categoryData,
  isHomePage,
  t,
}) => {
  const pathname = usePathname(); // ✅ düzəliş burada

  // 👇 Dil prefiksini çıxarırıq (/az, /en, /ru)
  const cleanedPath = pathname.replace(/^\/(az|en|ru)/, "");

  // Default ağ
  let backgroundColor = "#FFFFFF";

  // ✅ About
  if (cleanedPath === "/about") {
    backgroundColor = "#CBD9EF";
  }

  // ✅ Events
  else if (cleanedPath === "/events") {
    backgroundColor = "#E9F2FF";
  }

  // ✅ contact, faq, support, privacy, mission
  else if (
    ["/contact", "/faq", "/support", "/privacy", "/mission"].includes(
      cleanedPath,
    )
  ) {
    backgroundColor = "#F3F7FC";
  }

  const contactData = contact?.data || {};

  return (
    <div
      className="footerMain"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
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
                <Link
                  href={`mailto:${contactData.email || "info@adentta.com"}`}
                >
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

            {/* Products */}
            <div className="footerLinks">
              <Link href="/products">
                <span>{t.products || "Products"}</span>
              </Link>
              <ul>
                {categoryData?.slice(0, 6).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={{
                        pathname: "/products",
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
    </div>
  );
};

export default Footer;



















// !Layout mentiqi

// "use client";

// import Link from "next/link";
// import React from "react";
// import FooterBottom from "./FooterBottom";
// import Image from "next/image";
// import WhatsApp from "../../../public/icons/whatsapp.svg";
// import Linkedin from "../../../public/icons/linkedin.svg";
// import Instagram from "../../../public/icons/instagram.svg";
// import Facebook from "../../../public/icons/facebook.svg";

// const Footer = ({
//   contact,
//   brandsData,
//   eventsData,
//   categoryData,
//   isHomePage,
//   t,
// }) => {
//   const pathname =
//     typeof window !== "undefined" ? window.location.pathname : "";

//   // 👇 Dil prefiksini çıxarırıq (/az, /en, /ru)
//   const cleanedPath = pathname.replace(/^\/(az|en|ru)/, "");

//   // Boz (sənin verdiyin #F3F7FC) olmalı səhifələr və product dynamic route
//   const grayRoutes = ["/about", "/faq", "/product"];

//   // startsWith dynamic route üçün
//   const isGrayPage = grayRoutes.some((route) => cleanedPath.startsWith(route));

//   const contactData = contact?.data || {};

//   return (
//     <div
//       className="footerMain"
//       style={{
//         backgroundColor: isGrayPage ? "#F3F7FC" : "#ffffff", // ✅ sənin verdiyin rəng
//       }}
//     >
//       <footer id="footer">
//         <div className="container footer">
//           <div className="footerContent">
//             {/* Brand & Sosyal */}
//             <div className="footerBrand">
//               <Link
//                 href="/"
//                 style={isHomePage ? { pointerEvents: "none" } : undefined}
//               >
//                 <Image
//                   src="/images/footerLogo.svg"
//                   alt="adentta"
//                   width={200}
//                   height={200}
//                   className="footerLogo"
//                 />
//               </Link>
//               <p>{t?.footerSeoText || "No results found"}</p>
//               <div className="socialIcons">
//                 <ul>
//                   <li>
//                     <Link href={contactData?.whatsapp_link} target="_blank">
//                       <WhatsApp />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href={contactData?.linkedin} target="_blank">
//                       <Linkedin />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href={contactData?.instagram} target="_blank">
//                       <Instagram />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href={contactData?.facebook} target="_blank">
//                       <Facebook />
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="contactButtons">
//                 <Link href={`tel:${contactData.phone || "+994554099878"}`}>
//                   <div className="contactButtonCall">
//                     <Image
//                       src="/icons/phoneicon.svg"
//                       alt="adentta"
//                       width={200}
//                       height={200}
//                     />
//                     <button>{t.call || "Call us"}</button>
//                   </div>
//                 </Link>
//                 <Link
//                   href={`mailto:${contactData.email || "info@adentta.com"}`}
//                 >
//                   <div className="contactButtonEmail">
//                     <Image
//                       src="/icons/email.svg"
//                       alt="adentta"
//                       width={200}
//                       height={200}
//                     />
//                     <button>{t.email || "Email us"}</button>
//                   </div>
//                 </Link>
//               </div>
//             </div>

//             {/* Products (kategori filtreli) */}
//             <div className="footerLinks">
//               <Link href="/products">
//                 <span>{t.products || "Products"}</span>
//               </Link>
//               <ul>
//                 {categoryData?.slice(0, 6).map((category) => (
//                   <li key={category.id}>
//                     <Link
//                       href={{
//                         pathname: "/products",
//                         query: { category: category.url_slug },
//                       }}
//                     >
//                       {category.title}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Brands */}
//             <div className="footerLinks">
//               <Link href="/brands">
//                 <span>{t.brands || "Brands"}</span>
//               </Link>
//               <ul>
//                 {brandsData?.slice(0, 6).map((brand) => (
//                   <li key={brand.id}>
//                     <Link
//                       href={`/brands/${brand?.title
//                         ?.toLowerCase()
//                         .replace(/\s+/g, "-")}-${brand.id}`}
//                     >
//                       {brand.title}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Events */}
//             <div className="footerLinks">
//               <Link href="/events">
//                 <span>{t.events || "Events"}</span>
//               </Link>
//               <ul>
//                 {eventsData?.slice(0, 6).map((event) => (
//                   <li key={event.id}>
//                     <Link
//                       href={`/events/${event?.title
//                         ?.toLowerCase()
//                         .replace(/\s+/g, "-")}-${event.id}`}
//                     >
//                       {event.title}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Company */}
//             <div className="footerLinks">
//               <span>{t.company || "Company"}</span>
//               <ul>
//                 <li>
//                   <Link href="/about">{t.aboutCompany || "About"}</Link>
//                 </li>
//                 <li>
//                   <Link href="/mission">{t.mission || "Our Mission"}</Link>
//                 </li>
//                 <li>
//                   <Link href="/team">{t.team || "Teams"}</Link>
//                 </li>
//                 <li>
//                   <Link href="/careers">{t.careers || "Careers"}</Link>
//                 </li>
//                 <li>
//                   <Link href="/contact">{t.contact || "Contact US"}</Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Media */}
//             <div className="footerLinks">
//               <span>{t.media || "Media"}</span>
//               <ul>
//                 <li>
//                   <Link href="/blogs">{t.blogs || "Blogs"}</Link>
//                 </li>
//                 <li>
//                   <Link href="/videogalery">{t.video || "Video Gallery"}</Link>
//                 </li>
//                 <li>
//                   <Link href="/catalog">{t.pdfCatalog || "PDF Catalog"}</Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <FooterBottom t={t} />
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;
