// import Link from "next/link";
// import React from "react";
// import FooterBottom from "./FooterBottom";
// import Image from "next/image";
// import WhatsApp from "../../../public/icons/whatsapp.svg";
// import Linkedin from "../../../public/icons/linkedin.svg";
// import Instagram from "../../../public/icons/instagram.svg";
// import Facebook from "../../../public/icons/facebook.svg";
// import axiosInstance from "@/lib/axios";

// async function getTranslations() {
//   try {
//     const data = axiosInstance.get("/translation-list");
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// const Footer = async ({ brandsData, eventsData, categoryData }) => {
//   const translations = await getTranslations();
//   const t = translations?.data;

//   return (
//     <footer id="footer">
//       <div className="container footer">
//         <div className="footerContent">
//           <div className="footerBrand">
//             <Link href="/">
//               <Image
//                 src="/images/footerLogo.svg"
//                 alt="adentta"
//                 width={200}
//                 height={200}
//                 className="footerLogo"
//               />
//             </Link>

//             <p>
//               Lorem ipsum dolor sit amet consectetur. Eu consectetur sed lectus
//               quis commodo quisque. Ullamcorper arcu tempus in ac facilisi.
//               Integer condimentum amet eu faucibus ultricies tellus ut. Pharetra
//               sed cras ante et arcu mauris quis ultrices.
//             </p>
//             <div className="socialIcons">
//               <ul>
//                 <li>
//                   <Link href="https://wa.me/994554099878" target="_blank">
//                     <WhatsApp />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="https://www.linkedin.com/company/adentta/"
//                     target="_blank"
//                   >
//                     <Linkedin />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="https://www.instagram.com/adentta.az/"
//                     target="_blank"
//                   >
//                     <Instagram />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="https://www.facebook.com/adentta.az"
//                     target="_blank"
//                   >
//                     <Facebook />
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div className="contactButtons">
//               <Link href={`tel:${t?.phoneNumber || "+994554099878"}`}>
//                 <div className="contactButtonCall">
//                   <Image
//                     src="/icons/phoneicon.svg"
//                     alt="adentta"
//                     width={200}
//                     height={200}
//                   />
//                   <button>{t?.call || "Call us"}</button>
//                 </div>
//               </Link>

//               <Link href={`mailto:${t?.emailAddress || "info@adentta.com"}`}>
//                 <div className="contactButtonEmail">
//                   <Image
//                     src="/icons/email.svg"
//                     alt="adentta"
//                     width={200}
//                     height={200}
//                   />
//                   <button>{t?.email || "Email us"}</button>
//                 </div>
//               </Link>
//             </div>
//           </div>
//           <div className="footerLinks">
//             <Link href="/products">
//               <h3>{t?.products || "Products"}</h3>
//             </Link>
//             <ul>
//               {categoryData.slice(0, 6).map((category) => (
//                 <li key={category.id}>
//                   <Link
//                     href={`/products/${category.title
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}-${category.id}`}
//                   >
//                     {category.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="footerLinks">
//             <Link href="/brands">
//               <h3>{t?.brands || "Brands"}</h3>
//             </Link>
//             <ul>
//               {brandsData.slice(0, 6).map((brand) => (
//                 <li key={brand.id}>
//                   <Link
//                     href={`/brands/${brand.title
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}-${brand.id}`}
//                   >
//                     {brand.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="footerLinks">
//             <Link href="/events">
//               <h3>{t?.events || "Events"}</h3>
//             </Link>

//             <ul>
//               {eventsData.slice(0, 6).map((event) => (
//                 <li key={event.id}>
//                   <Link
//                     href={`/events/${event.title
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}-${event.id}`}
//                   >
//                     {event.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="footerLinks">
//             <Link href="/company">
//               <h3>{t?.company || "Company"}</h3>
//             </Link>
//             <ul>
//               <li>
//                 <Link href="/about">{t?.aboutCompany || "About"}</Link>
//               </li>
//               <li>
//                 <Link href="/mission">{t?.mission || "Our Mission"}</Link>
//               </li>
//               <li>
//                 <Link href="/team">{t?.team || "Teams"}</Link>
//               </li>
//               <li>
//                 <Link href="/doctors">{t?.doctors || "Doctors"}</Link>
//               </li>
//               <li>
//                 <Link href="/brands">{t?.brands || "Brands"}</Link>
//               </li>
//               <li>
//                 <Link href="/careers">{t?.careers || "Careers"}</Link>
//               </li>
//               <li>
//                 <Link href="/contact">{t?.contact || "Contact US"}</Link>
//               </li>
//             </ul>
//           </div>

//           <div className="footerLinks">
//             <Link href="/media">
//               <h3>{t?.media || "Media"}</h3>
//             </Link>
//             <ul>
//               <li>
//                 <Link href="/blogs">{t?.blogs || "Blogs"}</Link>
//               </li>
//               <li>
//                 <Link href="/videogalery">{t?.video || "Video Gallery"}</Link>
//               </li>
//               <li>
//                 <Link href="/catalog">{t?.pdfCatalog || "PDF Catalog"}</Link>
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

//! Footer son versiya
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

const Footer = async ({ brandsData, eventsData, categoryData, isHomePage }) => {
  const t = await getTranslations();

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
            {/* <div dangerouslySetInnerHTML={{ __html: t?.footerSeoText || "No results found" }}></div> */}
            <div className="socialIcons">
              <ul>
                <li>
                  <Link href="https://wa.me/994554099878" target="_blank">
                    <WhatsApp />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/adentta/"
                    target="_blank"
                  >
                    <Linkedin />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/adentta.az/"
                    target="_blank"
                  >
                    <Instagram />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/adentta.az"
                    target="_blank"
                  >
                    <Facebook />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="contactButtons">
              <Link href={`tel:${t.phoneNumber || "+994554099878"}`}>
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
              <Link href={`mailto:${t.emailAddress || "info@adentta.com"}`}>
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
            <Link href="/products">
              <h3>{t.products || "Products"}</h3>
            </Link>
            <ul>
              {categoryData?.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={{
                      pathname: "/products",
                      query: { category: category.id },
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
              <h3>{t.brands || "Brands"}</h3>
            </Link>
            <ul>
              {brandsData?.slice(0, 6).map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={`/brands/${brand.title
                      .toLowerCase()
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
              <h3>{t.events || "Events"}</h3>
            </Link>
            <ul>
              {eventsData?.slice(0, 6).map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/events/${event.title
                      .toLowerCase()
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
            <Link href="/about">
              <h3>{t.company || "Company"}</h3>
            </Link>
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
                <Link href="/doctors">{t.doctors || "Doctors"}</Link>
              </li>
              <li>
                <Link href="/brands">{t.brands || "Brands"}</Link>
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
            <Link href="#">
              <h3>{t.media || "Media"}</h3>
            </Link>
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
