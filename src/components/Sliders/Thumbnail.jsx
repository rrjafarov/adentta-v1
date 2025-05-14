//! son versiya
"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import ArrowLeft from "../../../public/icons/careersLeftArrow.svg";
import ArrowRight from "../../../public/icons/careersRightArrow.svg";
import "../../app/[locale]/globals.scss";

// Fancybox ayarları
Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: { zoom: false },
});

const Thumbnail = ({ productData ,t }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Ekran genişliğini takip et
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mevcut sayfa URL'sini al
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Paylaşım URL'leri
  const shareUrls = {
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
  };

  // Slide listesi: eğer images varsa onları, yoksa tek resmi al
  const slides =
    productData.images && productData.images.length > 0
      ? productData.images
      : [productData.image];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="detailPageContainer">
      {/* --- Sol Thumbnails (masaüstünde) --- */}
      {!isMobile && slides.length > 0 && (
        <div className="thumbnailWrapper">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            className="thumbnailSwiper"
          >
            {slides.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="productDetailPageImgSlider">
                  <Image
                    src={`https://admin.adentta.az/storage${src}`}
                    alt={`Thumbnail ${idx + 1}`}
                    width={800}
                    height={800}  
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* --- Ana Slider --- */}
      <div className="mainSwiperPP">
        <Swiper
          thumbs={{ swiper: thumbsSwiper }}
          navigation={{
            nextEl: ".DPcustom-swiper-button-next",
            prevEl: ".DPcustom-swiper-button-prev",
          }}
          pagination={isMobile ? { clickable: true } : false}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          modules={[FreeMode, Thumbs, Navigation, Pagination]}
          className="mainSwiper"
        >
          {slides.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="mainSwiperImages">
                <Link
                  href={`https://admin.adentta.az/storage${src}`}
                  className="DPgalleryImg block"
                  data-fancybox="videos"
                >
                  <Image
                    src={`https://admin.adentta.az/storage${src}`}
                    alt={`Main image ${idx + 1}`}
                    width={800}
                    height={800}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Paylaşım linkleri */}
        <div className="detailPageShareLinks desktopProductLink topper flex items-center">
          <span>{t?.productsPageShare || "Share with"}:</span>
          <Link
            href={shareUrls.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="detailPageShareLink ml-2"
          >
            <img src="/icons/telegramBold.svg" alt="Telegram" />
          </Link>
          <Link
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="detailPageShareLink ml-2"
          >
            <img src="/icons/facebookBold.svg" alt="Facebook" />
          </Link>
          <Link
            href={shareUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="detailPageShareLink ml-2"
          >
            <img src="/icons/linkedinBold.svg" alt="LinkedIn" />
          </Link>
          <Link
            href={shareUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="detailPageShareLink ml-2"
          >
            <img src="/icons/whatsappBold.svg" alt="WhatsApp" />
          </Link>
          <button onClick={handleCopy} className="detailPageShareLinkCOPY ml-2">
            <img src="/icons/copyBold.svg" alt="Copy link" />
            <span>{t?.copyLink || "copy link"}</span>
          </button>
          {copied && <span className="copy-feedback ml-2">Copied</span>}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;






























// !LAzimsiz
// "use client";
// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/pagination";
// import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
// // import "../../app/globals.scss";
// import "../../app/[locale]/globals.scss";

// import Link from "next/link";
// import Image from "next/image";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
// import ArrowLeft from "../../../public/icons/careersLeftArrow.svg";
// import ArrowRight from "../../../public/icons/careersRightArrow.svg";

// Fancybox.bind("[data-fancybox]", {
//   dragToClose: false,
//   Image: {
//     zoom: false,
//   },
// });

// const Thumbnail = ({ productData }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   // Aktif resim state'i
//   const [activeImage, setActiveImage] = useState(productData.image);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Thumbnail slider için resimler: Eğer productData.images varsa, ana resmi de dizinin başına ekliyoruz.
//   const thumbSlides =
//     productData.images && productData.images.length > 0
//       ? [productData.image, ...productData.images]
//       : [productData.image];

//   return (
//     <div>
//       <div className="detailPageContainer">
//         {/* Thumbnail Slider: Sadece masaüstünde ve thumbSlides varsa */}
//         {!isMobile && thumbSlides.length > 0 && (
//           <Swiper
//             onSwiper={setThumbsSwiper}
//             direction="vertical"
//             spaceBetween={10}
//             slidesPerView={4}
//             freeMode={true}
//             watchSlidesProgress={true}
//             modules={[FreeMode, Navigation, Thumbs]}
//             className="thumbnailSwiper"
//           >
//             {thumbSlides.map((slide, index) => (
//               <SwiperSlide key={index}>
//                 <div
//                   className="productDetailPageImgSlider"
//                   // Tıklanınca main slider'daki resmi güncelle
//                   onClick={() => setActiveImage(slide)}
//                 >
//                   <Image
//                     src={`https://admin.adentta.az/storage${slide}`}
//                     alt={`Thumbnail image ${index + 1}`}
//                     width={800}
//                     height={800}
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}

//         <div className="mainSwiperPP">
//           <Swiper
//             {...(!isMobile && { thumbs: { swiper: thumbsSwiper } })}
//             navigation={{
//               nextEl: ".DPcustom-swiper-button-next",
//               prevEl: ".DPcustom-swiper-button-prev",
//             }}
//             pagination={isMobile ? { clickable: true } : undefined}
//             slidesPerView={1}
//             spaceBetween={20}
//             loop={true}
//             modules={
//               isMobile
//                 ? [FreeMode, Thumbs, Pagination, Navigation]
//                 : [FreeMode, Thumbs, Navigation]
//             }
//             className="mainSwiper"
//           >
//             {thumbSlides.map((slide, index) => (
//               <SwiperSlide key={index}>
//                 <div className="mainSwiperImages">
//                   <Link
//                     href={`https://admin.adentta.az/storage${activeImage}`}
//                     className="DPgalleryImg block"
//                     data-fancybox="videos"
//                   >
//                     <Image
//                       src={`https://admin.adentta.az/storage${activeImage}`}
//                       alt="Main product image"
//                       width={800}
//                       height={800}
//                     />
//                   </Link>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <div className="DPcustom-navigation">
//             <button className="DPcustom-swiper-button-prev">
//               <ArrowLeft />
//             </button>
//             <button className="DPcustom-swiper-button-next">
//               <ArrowRight />
//             </button>
//           </div>
//           <div className="detailPageShareLinks desktopProductLink topper">
//             <span>Share with :</span>
//             <Link href="#">
//               <div className="detailPageShareLink">
//                 <img src="/icons/telegramBold.svg" alt="Telegram" />
//               </div>
//             </Link>
//             <Link href="#">
//               <div className="detailPageShareLink">
//                 <img src="/icons/facebookBold.svg" alt="Facebook" />
//               </div>
//             </Link>
//             <Link href="#">
//               <div className="detailPageShareLink">
//                 <img src="/icons/linkedinBold.svg" alt="LinkedIn" />
//               </div>
//             </Link>
//             <Link href="#">
//               <div className="detailPageShareLink">
//                 <img src="/icons/whatsappBold.svg" alt="WhatsApp" />
//               </div>
//             </Link>
//             <Link href="#">
//               <div className="detailPageShareLinkCOPY">
//                 <img src="/icons/copyBold.svg" alt="Copy link" />
//                 <span>Copy link</span>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Thumbnail;
// !LAzimsiz
