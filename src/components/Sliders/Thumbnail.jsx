  // "use client";
  // import React, { useState, useEffect } from "react";
  // import { Swiper, SwiperSlide } from "swiper/react";
  // import "swiper/css";
  // import "swiper/css/free-mode";
  // import "swiper/css/navigation";
  // import "swiper/css/thumbs";
  // import "swiper/css/pagination";
  // import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
  // import Link from "next/link";
  // import Image from "next/image";
  // import { Fancybox } from "@fancyapps/ui";
  // import "@fancyapps/ui/dist/fancybox/fancybox.css";
  // import "../../app/[locale]/globals.scss";

  // // Fancybox ayarları
  // Fancybox.bind("[data-fancybox]", {
  //   dragToClose: false,
  //   Image: { zoom: false },
  // });

  // const Thumbnail = ({ productData, t }) => {
  //   const [thumbsSwiper, setThumbsSwiper] = useState(null);
  //   const [isMobile, setIsMobile] = useState(false);
  //   const [currentUrl, setCurrentUrl] = useState("");
  //   const [copied, setCopied] = useState(false);

  //   useEffect(() => {
  //     const handleResize = () => setIsMobile(window.innerWidth < 768);
  //     handleResize();
  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }, []);

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       setCurrentUrl(window.location.href);
  //     }
  //   }, []);

  //   const shareUrls = {
  //     telegram: `https://t.me/share/url?url=${encodeURIComponent(
  //       currentUrl
  //     )}&text=${encodeURIComponent(productData.title)}`,
  //     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //       currentUrl
  //     )}"e=${encodeURIComponent(productData.title)}`,
  //     linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
  //       currentUrl
  //     )}&title=${encodeURIComponent(
  //       productData.title
  //     )}&summary=${encodeURIComponent(currentUrl)}`,
  //     whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
  //       `${productData.title} - ${currentUrl}`
  //     )}`,
  //   };

  //   // Mevcut image ve images alanlarını birleştirip falsy değerleri filtreliyoruz:
  //   const slides = [productData.image]
  //     .concat(Array.isArray(productData.images) ? productData.images : [])
  //     .filter(Boolean);

  //   const handleCopy = () => {
  //     navigator.clipboard.writeText(currentUrl);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   };

  //   return (
  //     <div className="detailPageContainer">
  //       <div className="thumbnailWrapper">
  //         {!isMobile && slides.length > 0 && (
  //           <Swiper
  //             onSwiper={setThumbsSwiper}
  //             direction="vertical"
  //             spaceBetween={10}
  //             slidesPerView={4}
  //             freeMode
  //             watchSlidesProgress
  //             modules={[FreeMode, Thumbs]}
  //             className="thumbnailSwiper"
  //           >
  //             {slides.map((src, idx) => (
  //               <SwiperSlide key={idx}>
  //                 <div className="productDetailPageImgSlider">
  //                   <Image
  //                     src={`https://admin.adentta.az/storage${src}`}
  //                     alt={`Thumbnail ${idx + 1}`}
  //                     width={800}
  //                     height={800}
  //                     style={{ objectFit: "cover" }}
  //                   />
  //                 </div>
  //               </SwiperSlide>
  //             ))}
  //           </Swiper>
  //         )}
  //       </div>

  //       <div className="mainSwiperPP">
  //         {slides.length > 0 ? (
  //           <Swiper
  //             thumbs={{ swiper: thumbsSwiper }}
  //             navigation={{
  //               nextEl: ".DPcustom-swiper-button-next",
  //               prevEl: ".DPcustom-swiper-button-prev",
  //             }}
  //             pagination={isMobile ? { clickable: true } : false}
  //             slidesPerView={1}
  //             spaceBetween={30}
  //             loop={true}
  //             modules={[FreeMode, Thumbs, Navigation, Pagination]}
  //             className="mainSwiper"
  //           >
  //             {slides.map((src, idx) => (
  //               <SwiperSlide key={idx}>
  //                 <div className="mainSwiperImages">
  //                   <Link
  //                     href={`https://admin.adentta.az/storage${src}`}
  //                     className="DPgalleryImg block"
  //                     data-fancybox="videos"
  //                   >
  //                     <Image
  //                       src={`https://admin.adentta.az/storage${src}`}
  //                       alt={`Ana resim ${idx + 1}`}
  //                       width={800}
  //                       height={800}
  //                     />
  //                   </Link>
  //                 </div>
  //               </SwiperSlide>
  //             ))}
  //           </Swiper>
  //         ) : (
  //           null
  //         )}



  //         <div className="detailPageShareLinks desktopProductLink topper flex items-center">
  //           <span>{t?.productsPageShare || "Paylaş"}:</span>
  //           <Link
  //             href={shareUrls.telegram}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="detailPageShareLink ml-2"
  //           >
  //             <img src="/icons/telegramBold.svg" alt="Telegram" />
  //           </Link>
  //           <Link
  //             href={shareUrls.facebook}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="detailPageShareLink ml-2"
  //           >
  //             <img src="/icons/facebookBold.svg" alt="Facebook" />
  //           </Link>
  //           <Link
  //             href={shareUrls.linkedin}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="detailPageShareLink ml-2"
  //           >
  //             <img src="/icons/linkedinBold.svg" alt="LinkedIn" />
  //           </Link>
  //           <Link
  //             href={shareUrls.whatsapp}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="detailPageShareLink ml-2"
  //           >
  //             <img src="/icons/whatsappBold.svg" alt="WhatsApp" />
  //           </Link>
  //           <button onClick={handleCopy} className="detailPageShareLinkCOPY ml-2">
  //             <img src="/icons/copyBold.svg" alt="Linki kopyala" />
  //             <span>{t?.copyLink || "Linki kopyala"}</span>
  //           </button>
  //           {copied && <span className="copy-feedback ml-2">Copied</span>}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default Thumbnail;

































































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
import "../../app/[locale]/globals.scss";

// Fancybox ayarları
Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: { zoom: false },
});

// YouTube URL-dən video ID çıxarır
const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const Thumbnail = ({ productData, t }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareUrls = {
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(productData.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}&e=${encodeURIComponent(productData.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}&title=${encodeURIComponent(
      productData.title
    )}&summary=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${productData.title} - ${currentUrl}`
    )}`,
  };

  // Max 3 şəkil: 1 əsas image + lazımi qədər images (video varsa max 2, yoxdursa max 3)
  const allImages = [productData.image]
    .concat(Array.isArray(productData.images) ? productData.images : [])
    .filter(Boolean);

  const youtubeId = getYoutubeId(productData.youtube_url);
  // Video varsa: max 3 şəkil + 1 video = 4 slot
  // Video yoxdursa: max 3 şəkil
  const imageSlides = allImages.slice(0, 3);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="detailPageContainer">
      <div className="thumbnailWrapper">
        {!isMobile && (
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
            {/* Şəkil thumbnail-ləri */}
            {imageSlides.map((src, idx) => (
              <SwiperSlide key={`img-thumb-${idx}`}>
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

            {/* Video thumbnail - YouTube preview şəkli + play icon */}
            {youtubeId && (
              <SwiperSlide key="video-thumb">
                <div className="productDetailPageImgSlider" style={{ position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      productData.cover_image
                        ? `https://admin.adentta.az/storage${productData.cover_image}`
                        : `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
                    }
                    alt="Video thumbnail"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                  {/* Play icon overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#1c2759">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        )}
      </div>

      <div className="mainSwiperPP">
        {(imageSlides.length > 0 || youtubeId) && (
          <Swiper
            thumbs={{ swiper: thumbsSwiper }}
            navigation={{
              nextEl: ".DPcustom-swiper-button-next",
              prevEl: ".DPcustom-swiper-button-prev",
            }}
            pagination={isMobile ? { clickable: true } : false}
            slidesPerView={1}
            spaceBetween={30}
            loop={false} // video slide-ı olan hallarda loop problem çıxara bilər
            modules={[FreeMode, Thumbs, Navigation, Pagination]}
            className="mainSwiper"
          >
            {/* Şəkil slide-ları */}
            {imageSlides.map((src, idx) => (
              <SwiperSlide key={`img-slide-${idx}`}>
                <div className="mainSwiperImages">
                  <Link
                    href={`https://admin.adentta.az/storage${src}`}
                    className="DPgalleryImg block"
                    data-fancybox="gallery"
                  >
                    <Image
                      src={`https://admin.adentta.az/storage${src}`}
                      alt={`Ana resim ${idx + 1}`}
                      width={800}
                      height={800}
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}

            {/* Video slide - həmişə ən sonda */}
            {youtubeId && (
              <SwiperSlide key="video-slide">
                <div className="mainSwiperImages" style={{ position: "relative" }}>
                  <Link
                    href={productData.youtube_url}
                    className="DPgalleryImg block"
                    data-fancybox="gallery"
                    data-type="iframe"
                    data-src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  >
                    {/* Video cover şəkli - cover_image varsa onu, yoxdursa YouTube preview */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        productData.cover_image
                          ? `https://admin.adentta.az/storage${productData.cover_image}`
                          : `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
                      }
                      alt="Video"
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                    {/* Play button overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        }}
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="#1c2759"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        )}

        <div className="detailPageShareLinks desktopProductLink topper flex items-center">
          <span>{t?.productsPageShare || "Paylaş"}:</span>
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
            <img src="/icons/copyBold.svg" alt="Linki kopyala" />
            <span>{t?.copyLink || "Linki kopyala"}</span>
          </button>
          {copied && <span className="copy-feedback ml-2">Copied</span>}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;