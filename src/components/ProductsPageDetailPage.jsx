// "use client";
// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import "../app/[locale]/globals.scss";
// import Link from "next/link";
// import Thumbnail from "./Sliders/Thumbnail";
// import Image from "next/image";
// import Manat from "../../public/icons/manat.svg";

// const WpLink = () => {
//   const [currentUrl, setCurrentUrl] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setCurrentUrl(window.location.href);
//     }
//   }, []);

//   const message = encodeURIComponent(
//     `Salam, bu məhsul haqqında məlumat ala bilərəm?: ${currentUrl}`
//   );
//   const whatsappLink = `https://wa.me/994554099878?text=${message}`;

//   return (
//     <Link
//       href={whatsappLink}
//       className="wpButton"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <div className="detailPageClickToWhatsapp">
//         <span>ClickTo order</span>
//         <div className="dpWP">
//           <img src="/icons/whiteWP.svg" alt="WhatsApp Icon" />
//           <span>Whatsapp</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// const DetailPageAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="accordion">
//       <button
//         className="accordion-header-dp"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <img
//           src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
//           alt="Toggle Icon"
//           className="toggle-icon"
//         />
//         {title}
//       </button>
//       {isOpen && <div className="accordion-content-dp">{children}</div>}
//     </div>
//   );
// };

// const ProductsPageDetailPage = ({ productData }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [currentUrl, setCurrentUrl] = useState("");
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setCurrentUrl(window.location.href);
//     }
//   }, []);

//   const shareUrls = {
//     telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`,
//     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//       currentUrl
//     )}`,
//     linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//       currentUrl
//     )}`,
//     whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
//       currentUrl
//     )}`,
//   };

//   const handleCopy = () => {
//     if (!currentUrl) return;
//     navigator.clipboard.writeText(currentUrl).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   return (
//     <>
//       <section id="productPageDPsection">
//         <div className="container">
//           <div className="row">
//             <div className="xl-6 md-6 lg-6 sm-12">
//               <div className="detailPageContainer">
//                 <Thumbnail
//                   productData={productData}
//                   thumbsSwiper={thumbsSwiper}
//                   setThumbsSwiper={setThumbsSwiper}
//                 />
//               </div>
//             </div>
//             <div className="xl-6 md-6 lg-6 sm-12">
//               <div className="productDetailRight">
//                 <span>
//                   Product code: # <span>{productData.code}</span>
//                 </span>
//                 <div className="productDetailRightTitle">
//                   <h3>{productData.title}</h3>
//                   <div className="detailPagePrice">
//                     <div className="dpPriceItem">
//                       <span>{productData.price}</span>
//                       <Manat />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="brandAndCountry">
//                   <div className="detailBrand">
//                     <span>Brand Name:</span>
//                     <div className="detailBrandInner">
//                       <Image
//                         src={`https://admin.adentta.az/storage${productData.brands[0].logo}`}
//                         alt={productData.brands[0].name}
//                         width={50}
//                         height={50}
//                       />
//                     </div>
//                   </div>
//                   <div className="detailCountry">
//                     <span>Country Name:</span>
//                     <div className="detailCountryInner">
//                       <span>{productData.country?.[0]?.title ?? "Yoxdur"}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <WpLink />
//                 <div className="detailPageAccordion">
//                   <DetailPageAccordion title="About products">
//                     <div
//                       dangerouslySetInnerHTML={{ __html: productData.content }}
//                     />
//                   </DetailPageAccordion>
//                   <div className="lines"></div>

//                   <DetailPageAccordion title="Details of product">
//                     <div className="row">
//                       <div className="xl-6 lg-6 md-6 sm-12">
//                         <div className="flex flex-col">
//                           <span className="paramTitle">Parameters</span>
//                           <div className="productParametrs">
//                             <span>
//                               {productData.parametrs?.[0]?.title ?? "Yoxdur"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="xl-6 lg-6 md-6 sm-12">
//                         <div className="flex flex-col">
//                           <span className="paramTitle">Size</span>
//                           <div className="productParametrs">
//                             <span>
//                               {productData.sizes?.[0]?.title ?? "Yoxdur"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="xl-6 lg-6 md-6 sm-12">
//                         <div className="flex flex-col">
//                           <span className="paramTitle">Category</span>
//                           <div className="productParametrs">
//                             <span>
//                               {productData.categories?.[0]?.title ?? "Yoxdur"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </DetailPageAccordion>

//                   <div className="lines"></div>

// <DetailPageAccordion title="Delivery">
//   <div className="detailPageDelivery">
//     <div className="littleCartDP">
//       <img
//         src="/icons/timerCarIcon.svg"
//         alt="Delivery Icon"
//       />
//       <div className="littleCartDPinner">
//         <span>Delivery</span>
//         <p>Bütün bölgələrimizə pulsuz çatdırılma</p>
//       </div>
//     </div>
//     <div className="littleCartDP">
//       <img src="/icons/percentIcon.svg" alt="Discount Icon" />
//       <div className="littleCartDPinner">
//         <span>Reasonable price</span>
//         <p>20% ilkin ödənişlə</p>
//       </div>
//     </div>
//     <div className="littleCartDP">
//       <img
//         src="/icons/servicesStarIcon.svg"
//         alt="Service Icon"
//       />
//       <div className="littleCartDPinner">
//         <span>Our Service</span>
//         <p>Hər daim xidmətinizdəyik!</p>
//       </div>
//     </div>
//     <div className="littleCartDP">
//       <img
//         src="/icons/educationIcon.svg"
//         alt="Education Icon"
//       />
//       <div className="littleCartDPinner">
//         <span>Training and Education</span>
//         <p>
//           Hər bir cihaz üzrə praktikalar və nəzəriyyələr
//           keçirilir
//         </p>
//       </div>
//     </div>
//   </div>
// </DetailPageAccordion>

// <div className="lines"></div>

// <DetailPageAccordion title="Pay in Easy Installments">
//   <div className="bankCarts">
//     <div className="bankCart">
//       <img
//         src="/images/kapitalBankImg.png"
//         alt="Kapital Bank"
//       />
//     </div>
//     <div className="bankCart">
//       <img src="/images/tamKartImg.png" alt="TamKart" />
//     </div>
//     <div className="bankCart">
//       <img src="/images/albaliKartImg.png" alt="AlbaliKart" />
//     </div>
//     <div className="bankCart">
//       <img
//         src="/images/leobankKartImg.png"
//         alt="LeoBankKart"
//       />
//     </div>
//   </div>
// </DetailPageAccordion>
//                 </div>
//               </div>
//               <div className="detailPageShareLinks mobileProductLink">
//                 <span>Share:</span>
//                 <Link
//                   href={shareUrls.telegram}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="detailPageShareLink ml-2"
//                 >
//                   <img src="/icons/telegramBold.svg" alt="Telegram" />
//                 </Link>
//                 <Link
//                   href={shareUrls.facebook}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="detailPageShareLink ml-2"
//                 >
//                   <img src="/icons/facebookBold.svg" alt="Facebook" />
//                 </Link>
//                 <Link
//                   href={shareUrls.linkedin}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="detailPageShareLink ml-2"
//                 >
//                   <img src="/icons/linkedinBold.svg" alt="LinkedIn" />
//                 </Link>
//                 <Link
//                   href={shareUrls.whatsapp}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="detailPageShareLink ml-2"
//                 >
//                   <img src="/icons/whatsappBold.svg" alt="WhatsApp" />
//                 </Link>
//                 <button
//                   onClick={handleCopy}
//                   className="detailPageShareLinkCOPY ml-2"
//                 >
//                   <img src="/icons/copyBold.svg" alt="Copy link" />
//                   <span>Copy link</span>
//                 </button>
//                 {copied && <span className="copy-feedback ml-2">Copied</span>}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="detailPagesSimilarsBottom">
//         <div className="container">
//           <h4>Similars</h4>
//           <div className="row">
//             <div className="xl-3 lg-3 md-6 sm-6 ">
//               <Link href="/products/id" className="block">
//                 <div className="detailPageBottomSimilar">
//                   <div className="homePageProductCardContent ">
//                     <div className="homePageProCardImgs">
//                       <div className="homePageProductCardContentImage">
//                         <img src="/images/productsImg02.png" alt="" />
//                       </div>
//                     </div>
//                     <div className="homePageProductCardContentInner">
//                       <div className="homePageProductCardContentText ">
//                         <span>Equipment product </span>
//                         <p>Learn more about product</p>
//                       </div>
//                       <div className="price">
//                         <div className="priceItem">
//                           <strong id="prices">4949</strong>
//                           <Manat />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="homePageProductCardContentBottom">
//                       <span>Learn More</span>
//                       <img src="/icons/arrowTopRight.svg" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//             <div className="xl-3 lg-3 md-6 sm-6 ">
//               <Link href="/products/id" className="block">
//                 <div className="detailPageBottomSimilar">
//                   <div className="homePageProductCardContent ">
//                     <div className="homePageProCardImgs">
//                       <div className="homePageProductCardContentImage">
//                         <img src="/images/productsImg02.png" alt="" />
//                       </div>
//                     </div>
//                     <div className="homePageProductCardContentInner">
//                       <div className="homePageProductCardContentText ">
//                         <span>Equipment product </span>
//                         <p>Learn more about product</p>
//                       </div>
//                       <div className="price">
//                         <div className="priceItem">
//                           <strong id="prices">4949</strong>
//                           <Manat />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="homePageProductCardContentBottom">
//                       <span>Learn More</span>
//                       <img src="/icons/arrowTopRight.svg" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//             <div className="xl-3 lg-3 md-6 sm-6 ">
//               <Link href="/products/id" className="block">
//                 <div className="detailPageBottomSimilar">
//                   <div className="homePageProductCardContent ">
//                     <div className="homePageProCardImgs">
//                       <div className="homePageProductCardContentImage">
//                         <img src="/images/productsImg02.png" alt="" />
//                       </div>
//                     </div>
//                     <div className="homePageProductCardContentInner">
//                       <div className="homePageProductCardContentText ">
//                         <span>Equipment product </span>
//                         <p>Learn more about product</p>
//                       </div>
//                       <div className="price">
//                         <div className="priceItem">
//                           <strong id="prices">4949</strong>
//                           <Manat />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="homePageProductCardContentBottom">
//                       <span>Learn More</span>
//                       <img src="/icons/arrowTopRight.svg" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//             <div className="xl-3 lg-3 md-6 sm-6 ">
//               <Link href="/products/id" className="block">
//                 <div className="detailPageBottomSimilar">
//                   <div className="homePageProductCardContent ">
//                     <div className="homePageProCardImgs">
//                       <div className="homePageProductCardContentImage">
//                         <img src="/images/productsImg02.png" alt="" />
//                       </div>
//                     </div>
//                     <div className="homePageProductCardContentInner">
//                       <div className="homePageProductCardContentText ">
//                         <span>Equipment product </span>
//                         <p>Learn more about product</p>
//                       </div>
//                       <div className="price">
//                         <div className="priceItem">
//                           <strong id="prices">4949</strong>
//                           <Manat />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="homePageProductCardContentBottom">
//                       <span>Learn More</span>
//                       <img src="/icons/arrowTopRight.svg" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//           <div className=" container line"></div>
//         </div>
//       </section>

//       <section id="detailPagesSimilarsBottom">
//         <div className="container">
//           <h4>Last viewed</h4>
//           <div className="row">
//             <div className="xl-3 lg-3 md-6 sm-6 ">
//               <Link href="/products/id" className="block">
//                 <div className="detailPageBottomSimilar">
//                   <div className="homePageProductCardContent ">
//                     <div className="homePageProCardImgs">
//                       <div className="homePageProductCardContentImage">
//                         <img src="/images/productsImg02.png" alt="" />
//                       </div>
//                     </div>
//                     <div className="homePageProductCardContentInner">
//                       <div className="homePageProductCardContentText ">
//                         <span>Equipment product </span>
//                         <p>Learn more about product</p>
//                       </div>
//                       <div className="price">
//                         <div className="priceItem">
//                           <strong id="prices">4949</strong>
//                           <Manat />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="homePageProductCardContentBottom">
//                       <span>Learn More</span>
//                       <img src="/icons/arrowTopRight.svg" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//             <div className="xl-3 lg-3 md-6 sm-6 ">
//               <Link href="/products/id" className="block">
//                 <div className="detailPageBottomSimilar">
//                   <div className="homePageProductCardContent ">
//                     <div className="homePageProCardImgs">
//                       <div className="homePageProductCardContentImage">
//                         <img src="/images/productsImg02.png" alt="" />
//                       </div>
//                     </div>
//                     <div className="homePageProductCardContentInner">
//                       <div className="homePageProductCardContentText ">
//                         <span>Equipment product </span>
//                         <p>Learn more about product</p>
//                       </div>
//                       <div className="price">
//                         <div className="priceItem">
//                           <strong id="prices">4949</strong>
//                           <Manat />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="homePageProductCardContentBottom">
//                       <span>Learn More</span>
//                       <img src="/icons/arrowTopRight.svg" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//             <div className="xl-3 lg-3 md-6 sm-6 ">
//               <Link href="/products/id" className="block">
//                 <div className="detailPageBottomSimilar">
//                   <div className="homePageProductCardContent ">
//                     <div className="homePageProCardImgs">
//                       <div className="homePageProductCardContentImage">
//                         <img src="/images/productsImg02.png" alt="" />
//                       </div>
//                     </div>
//                     <div className="homePageProductCardContentInner">
//                       <div className="homePageProductCardContentText ">
//                         <span>Equipment product </span>
//                         <p>Learn more about product</p>
//                       </div>
//                       <div className="price">
//                         <div className="priceItem">
//                           <strong id="prices">4949</strong>
//                           <Manat />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="homePageProductCardContentBottom">
//                       <span>Learn More</span>
//                       <img src="/icons/arrowTopRight.svg" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//             <div className="xl-3 lg-3 md-6 sm-6 ">
//               <Link href="/products/id" className="block">
//                 <div className="detailPageBottomSimilar">
//                   <div className="homePageProductCardContent ">
//                     <div className="homePageProCardImgs">
//                       <div className="homePageProductCardContentImage">
//                         <img src="/images/productsImg02.png" alt="" />
//                       </div>
//                     </div>
//                     <div className="homePageProductCardContentInner">
//                       <div className="homePageProductCardContentText ">
//                         <span>Equipment product </span>
//                         <p>Learn more about product</p>
//                       </div>
//                       <div className="price">
//                         <div className="priceItem">
//                           <strong id="prices">4949</strong>
//                           <Manat />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="homePageProductCardContentBottom">
//                       <span>Learn More</span>
//                       <img src="/icons/arrowTopRight.svg" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductsPageDetailPage;

// //! son versiya

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Thumbnail from "./Sliders/Thumbnail";
import Manat from "../../public/icons/manat.svg";

const WpLink = ({ t }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // setCurrentUrl(window.location.href);
      setCurrentUrl(window.location.href);
    }
  }, []);
  const message = encodeURIComponent(
    // `Salam, bu məhsul haqqında məlumat ala bilərəm?: ${currentUrl}`
    `${
      t?.wpMessage || "Salam, bu məhsul haqqında məlumat ala bilərəm?"
    }: ${currentUrl}`
  );
  return (
    <Link
      href={`https://wa.me/994554099878?text=${message}`}
      prefetch={false}
      target="_blank"
      rel="noopener noreferrer"
      className="wpButton"
    >
      <div className="detailPageClickToWhatsapp">
        <span>{t?.clickToOrder || "ClickToOrder"}</span>
        <div className="dpWP">
          <img src="/icons/whiteWP.svg" alt="WhatsApp Icon" />
          <span>Whatsapp</span>
        </div>
      </div>
    </Link>
  );
};

const DetailPageAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion">
      <button
        className="accordion-header-dp"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
          alt="Toggle Icon"
          className="toggle-icon"
        />
        {title}
      </button>
      {isOpen && <div className="accordion-content-dp">{children}</div>}
    </div>
  );
};

const ProductsPageDetailPage = ({ t, productData, similarProducts = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [lastViewed, setLastViewed] = useState([]);

  // capture current URL
  useEffect(() => {
    if (typeof window !== "undefined") setCurrentUrl(window.location.href);
  }, []);

  // update last-viewed list in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = JSON.parse(localStorage.getItem("lastViewed") || "[]");
    const updated = [
      {
        id: productData.id,
        title: productData.title,
        image: productData.photo || productData.image,
        price: productData.price,
      },
      ...stored.filter((p) => p.id !== productData.id),
    ].slice(0, 4);
    localStorage.setItem("lastViewed", JSON.stringify(updated));
    setLastViewed(updated);
  }, [productData]);

  const shareUrls = {
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(productData.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}"e=${encodeURIComponent(productData.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}&title=${encodeURIComponent(
      productData.title
    )}&summary=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${productData.title} - ${currentUrl}`
    )}`,
  };

  const handleCopy = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* Product Detail */}
      <section id="productPageDPsection">
        <div className="container">
          <div className="filterTop dptopper topper">
            <Link href="/">
              <h1>Adentta</h1>
            </Link>
            <img src="/icons/rightDown.svg" alt="Adentta" />
            <Link href="/products">
              <h4>{t?.products || "Products"}</h4>
            </Link>
            <img src="/icons/rightDown.svg" alt="Adentta" />
            <h4>{productData.title}</h4>
          </div>

          <div className="row">
            {/* Left: thumbnails & main image */}
            <div className="xl-6 md-6 lg-6 sm-12">
              <div className="detailPageContainer">
                <Thumbnail
                  t={t}
                  productData={productData}
                  thumbsSwiper={thumbsSwiper}
                  setThumbsSwiper={setThumbsSwiper}
                />
              </div>
            </div>
            {/* Right: info, accordions, share */}
            <div className="xl-6 md-6 lg-6 sm-12">
              <div className="productDetailRight">
                <span>
                  {t?.productsPageProductCode || "Product code"}: #{" "}
                  <span>{productData.code}</span>
                </span>
                <div className="productDetailRightTitle">
                  <h3>{productData.title}</h3>
                  <div className="detailPagePrice">
                    <div className="dpPriceItem">
                      <span>{productData.price}</span>
                      <Manat />
                    </div>
                  </div>

                  {productData.quantity > 0 && (
                    <div className="detailPageQuantity">
                      <div className="dpQuantityItem">
                        <span>{t?.inStock || "Stoktadır"} : </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="brandAndCountry">
                  <div className="detailBrand">
                    <span>{t?.productsPageBrandName || "Brand Name"}:</span>
                    {productData?.brands?.[0]?.logo && (
                      <div className="detailBrandInner">
                        <Image
                          src={`https://admin.adentta.az/storage${productData.brands[0].logo}`}
                          alt={productData.brands[0].name || "Brand"}
                          width={400}
                          height={400}
                        />
                      </div>
                    )}
                    {/* <div className="detailBrandInner">
                      <Image
                        src={`https://admin.adentta.az/storage${productData.brands[0].logo}`}
                        alt={productData.brands[0].name}
                        width={400}
                        height={400}
                      />
                    </div> */}
                  </div>
                  <div className="detailCountry">
                    <span>{t?.productsPageCountryName || "Country Name"}:</span>
                    {productData.country?.[0]?.title && (
                      <div className="detailCountryInner">
                        <span>
                          {productData.country?.[0]?.title ?? "Country name"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <WpLink t={t} />

                <div className="detailPageAccordion">
                  {/* <DetailPageAccordion
                    title={t?.productsPageAboutProducts || "About products"}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: productData.content }}
                    />
                  </DetailPageAccordion> */}

                  {productData?.content && (
                    <DetailPageAccordion
                      title={t?.productsPageAboutProducts || "About products"}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productData.content,
                        }}
                      />
                    </DetailPageAccordion>
                  )}
                  <div className="lines" />

                  <DetailPageAccordion
                    title={t?.productsPageDetailsProducts || "Details Products"}
                  >
                    <div className="row">
                      <div className="xl-6 lg-6 md-6 sm-12">
                        <span className="paramTitle">
                          {t?.productsPageDetailsParameters || "parametrs"}
                        </span>
                        <div className="productParametrs">
                          <span>
                            {productData.parametrs?.[0]?.title ?? "Yoxdur"}
                          </span>
                        </div>
                      </div>
                      <div className="xl-6 lg-6 md-6 sm-12">
                        <span className="paramTitle">
                          {t?.productsPageDetailsSize || "Size"}
                        </span>
                        <div className="productParametrs">
                          <span>
                            {productData.sizes?.[0]?.title ?? "Yoxdur"}
                          </span>
                        </div>
                      </div>
                      <div className="xl-6 lg-6 md-6 sm-12">
                        <span className="paramTitle">
                          {t?.productsPageDetailsCategory || "Size"}
                        </span>
                        <div className="productParametrs">
                          <span>
                            {productData.categories?.[0]?.title ?? "Yoxdur"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </DetailPageAccordion>
                  <div className="lines" />

                  <DetailPageAccordion title={t?.deliver || "Delivery"}>
                    <div className="detailPageDelivery">
                      <div className="littleCartDP">
                        <img
                          src="/icons/timerCarIcon.svg"
                          alt="Delivery Icon"
                        />
                        <div className="littleCartDPinner">
                          <span>{t?.deliver || "Delivery"}</span>
                          <p>{t?.deliveryContent || "Delivery"}</p>
                        </div>
                      </div>
                      <div className="littleCartDP">
                        <img src="/icons/percentIcon.svg" alt="Discount Icon" />
                        <div className="littleCartDPinner">
                          <span>
                            {t?.affordablePrice || "Affrodable Price"}
                          </span>
                          <p>
                            {t?.affordablePriceContent ||
                              "With a 20% down payment"}
                          </p>
                        </div>
                      </div>
                      <div className="littleCartDP">
                        <img
                          src="/icons/servicesStarIcon.svg"
                          alt="Service Icon"
                        />
                        <div className="littleCartDPinner">
                          <span>{t?.ourService || "Our Service"}</span>
                          <p>
                            {t?.ourServiceContent || "Always at your service!"}
                          </p>
                        </div>
                      </div>
                      <div className="littleCartDP">
                        <img
                          src="/icons/educationIcon.svg"
                          alt="Education Icon"
                        />
                        <div className="littleCartDPinner">
                          <span>
                            {t?.traningAndEducation || "Training and Education"}
                          </span>
                          <p>
                            {t?.traningAndEducationContent ||
                              "Practical and theoretical sessions"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DetailPageAccordion>
                  <div className="lines"></div>

                  <DetailPageAccordion
                    title={
                      t?.productsPagePayCards || "Pay in Easy Installments"
                    }
                  >
                    <div className="bankCarts">
                      <div className="bankCart">
                        <img
                          src="/images/kapitalBankImg.png"
                          alt="Kapital Bank"
                        />
                      </div>
                      <div className="bankCart">
                        <img src="/images/tamKartImg.png" alt="TamKart" />
                      </div>
                      <div className="bankCart">
                        <img src="/images/albaliKartImg.png" alt="AlbaliKart" />
                      </div>
                      <div className="bankCart">
                        <img
                          src="/images/leobankKartImg.png"
                          alt="LeoBankKart"
                        />
                      </div>
                    </div>
                  </DetailPageAccordion>
                </div>
              </div>
              <div className="detailPageShareLinks mobileProductLink">
                <span>{t?.productsPageShare || "Share with"}:</span>
                {Object.entries(shareUrls).map(([key, url]) => (
                  <Link
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detailPageShareLink ml-2"
                  >
                    <img src={`/icons/${key}Bold.svg`} alt={key} />
                  </Link>
                ))}
                <button
                  onClick={handleCopy}
                  className="detailPageShareLinkCOPY ml-2"
                >
                  <img src="/icons/copyBold.svg" alt="Copy link" />
                  <span>{t?.copyLink || "copy link"}</span>
                </button>
                {copied && <span className="copy-feedback ml-2">Copied</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section id="detailPagesSimilarsBottom">
          <div className="container">
            <h4>{t?.similars || "Similars"}</h4>
            <div className="row">
              {similarProducts.map((prod) => (
                <div key={prod.id} className="xl-3 lg-3 md-6 sm-6">
                  <Link
                    href={`/products/${prod?.title
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}-${prod.id}`}
                    className="block"
                  >
                    <div className="detailPageBottomSimilar">
                      <div className="homePageProductCardContent">
                        <div className="homePageProCardImgs">
                          <div className="homePageProductCardContentImage">
                            <Image
                              // src={`https://admin.adentta.az/storage${prod.image}`}
                              src={
                                prod?.image
                                  ? `https://admin.adentta.az/storage${prod.image}`
                                  : "/images/adenttaDefaultImg.svg"
                              }
                              alt={prod.title}
                              width={400}
                              height={400}
                            />
                          </div>
                        </div>
                        <div className="homePageProductCardContentInner">
                          <div className="homePageProductCardContentText">
                            <span>{prod.title}</span>
                          </div>
                          <div className="price">
                            <div className="priceItem">
                              <strong id="prices">{prod.price}</strong>
                              <Manat />
                            </div>
                          </div>
                        </div>
                        <div className="homePageProductCardContentBottom">
                          <span>{t?.learnMore || "Learn More"}</span>

                          <img
                            src="/icons/arrowTopRight.svg"
                            alt="Learn More"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="container line" />
          </div>
        </section>
      )}
      {/* Last Viewed */}
      {lastViewed.length > 0 && (
        <section id="detailPagesSimilarsBottom">
          <div className="container">
            <h4>{t?.lastViewed || "Similars"}</h4>
            <div className="row">
              {lastViewed.map((prod) => (
                <div key={prod.id} className="xl-3 lg-3 md-6 sm-6">
                  <Link
                    href={`/products/${prod?.title
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}-${prod.id}`}
                    className="block"
                  >
                    <div className="detailPageBottomSimilar">
                      <div className="homePageProductCardContent">
                        <div className="homePageProCardImgs">
                          <div className="homePageProductCardContentImage">
                            <Image
                              // src={`https://admin.adentta.az/storage${prod.image}`}
                              src={
                                prod?.image
                                  ? `https://admin.adentta.az/storage${prod.image}`
                                  : "/images/adenttaDefaultImg.svg"
                              }
                              alt={prod.title}
                              width={400}
                              height={400}
                            />
                          </div>
                        </div>
                        <div className="homePageProductCardContentInner">
                          <div className="homePageProductCardContentText">
                            <span>{prod.title}</span>
                          </div>
                          <div className="price">
                            <div className="priceItem">
                              <strong id="prices">{prod.price}</strong>
                              <Manat />
                            </div>
                          </div>
                        </div>
                        <div className="homePageProductCardContentBottom">
                          <span>{t?.learnMore || "Learn More"}</span>

                          <img
                            src="/icons/arrowTopRight.svg"
                            alt="Learn More"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="container line" />
          </div>
        </section>
      )}
    </>
  );
};

export default ProductsPageDetailPage;
//! son  versiya
