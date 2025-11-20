// // ! son verisya
// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import Link from "next/link";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "../../app/[locale]/globals.scss";
// import { Autoplay, Pagination } from "swiper/modules";
// import { usePathname } from "next/navigation";

// Fancybox.bind("[data-fancybox]", {
//   dragToClose: false,
//   Image: {
//     zoom: false,
//   },
// });

// const BlogDetailSlider = ({ blogDetail,t }) => {
//   const [isVideoSliderOpen, setIsVideoSliderOpen] = useState(false);
//   const pathname = usePathname();
//   const origin = typeof window !== "undefined" ? window.location.origin : "";
//   const currentUrl = origin + pathname;

//   const handleCopy = (e) => {
//     e.preventDefault();
//     navigator.clipboard.writeText(currentUrl);
//   };

//   return (
//     <>
//       <div className="blogDetailSliderHeaderText">
//         <span
//           onClick={() => setIsVideoSliderOpen(false)}
//           style={{ cursor: "pointer", opacity: isVideoSliderOpen ? 0.5 : 1 }}
//         >
//           {t?.eventsPagePhoto || "Photo Gallery"}
//         </span>
//         <p
//           onClick={() => setIsVideoSliderOpen(true)}
//           style={{ cursor: "pointer", opacity: isVideoSliderOpen ? 1 : 0.5 }}
//         >
//           {t?.eventsPageVideo || "Video "}
//         </p>
//       </div>

//       {!isVideoSliderOpen ? (
//         <Swiper
//           slidesPerView={1.8}
//           spaceBetween={20}
//           breakpoints={{
//             0: { slidesPerView: 1, spaceBetween: 20 },
//             640: { slidesPerView: 1, spaceBetween: 20 },
//             1024: { slidesPerView: 1.8, spaceBetween: 20 },
//           }}
//           speed={2000}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           centeredSlides={true}
//           pagination={{ clickable: true, el: ".blogDetail-custom-pagination" }}
//           modules={[Autoplay, Pagination]}
//           className="mySwiper blogSwiper"
//         >
//           {blogDetail.image_gallery?.map((img, index) => (
//             <SwiperSlide key={index}>
//               <Link
//                 href={`https://admin.adentta.az/storage${img}`}
//                 className="blogSliderGalleryImg"
//                 data-fancybox="videos"
//               >
//                 <Image
//                   src={`https://admin.adentta.az/storage${img}`}
//                   className="blogSliderCardImg"
//                   alt="gallery"
//                   width={400}
//                   height={400}
//                 />
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={20}
//           speed={2000}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           centeredSlides={true}
//           modules={[Autoplay, Pagination]}
//           className="mySwiper blogSwiper"
//         >
//           <SwiperSlide>
//             <Link
//               href={blogDetail.video_url || "#"}
//               className="blogSliderGalleryImg emblem"
//               data-fancybox="videos"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Image
//                 src={`https://admin.adentta.az/storage${blogDetail.video_cover}`}
//                 className="blogSliderCardImgVideo"
//                 alt="gallery"
//                 width={850}
//                 height={800}
//               />
//               <div className="eventsPageAdressVideoText">
//                 <div className="eventsPagePlayIcon">
//                   <Image
//                     src="/icons/videoPlayIcon.svg"
//                     alt="play"
//                     width={28}
//                     height={28}
//                   />
//                 </div>
//               </div>
//             </Link>
//           </SwiperSlide>
//         </Swiper>
//       )}

//       <div className="blogDetail-custom-pagination"></div>

//       <div className="detailPageSocialLinks">
//         <div className="socialLinkLine"></div>
//         <div className="detailPageSocialLink">
//           {/* URL’i kopyala */}
//           <Link href="#" onClick={handleCopy}>
//             <span>
//               <Image src="/icons/copyBold.svg" alt="copy" width={10} height={10} />
//             </span>
//           </Link>
//           {/* Facebook */}
//           <Link
//             href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//               currentUrl
//             )}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <span>
//               <Image
//                 src="/icons/facebooklightBlue.svg"
//                 alt="facebook"
//                 width={10}
//                 height={10}
//               />
//             </span>
//           </Link>
//           {/* Twitter */}
//           <Link
//             href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
//               currentUrl
//             )}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <span>
//               <Image src="/icons/twitter.svg" alt="twitter" width={10} height={10} />
//             </span>
//           </Link>
//           {/* LinkedIn */}
//           <Link
//             href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
//               currentUrl
//             )}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <span>
//               <Image
//                 src="/icons/linkedinlightBlue.svg"
//                 alt="linkedin"
//                 width={10}
//                 height={10}
//               />
//             </span>
//           </Link>
//         </div>
//         <div className="socialLinkLine"></div>
//       </div>
//     </>
//   );
// };

// export default BlogDetailSlider;

// // ! son verisya


















"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "../../app/[locale]/globals.scss";
import { Autoplay, Pagination } from "swiper/modules";
import { usePathname } from "next/navigation";

Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: { zoom: false },
});

const BlogDetailSlider = ({ blogDetail, t }) => {
  const [isVideoSliderOpen, setIsVideoSliderOpen] = useState(false);
  const pathname = usePathname();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl = origin + pathname;

  const hasImages =
    Array.isArray(blogDetail.image_gallery) && blogDetail.image_gallery.length > 0;
  const hasVideo = Boolean(blogDetail.video_url);

  // Yalnız video varsa, otomatik olarak video sekmesini aç
  useEffect(() => {
    if (!hasImages && hasVideo) {
      setIsVideoSliderOpen(true);
    }
  }, [hasImages, hasVideo]);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(currentUrl);
  };

  return (
    <>
      <div className="blogDetailSliderHeaderText">
        {hasImages && (
          <span
            onClick={() => setIsVideoSliderOpen(false)}
            style={{ cursor: "pointer", opacity: isVideoSliderOpen ? 0.5 : 1 }}
          >
            {t?.eventsPagePhoto || "Photo Gallery"}
          </span>
        )}
        {hasVideo && (
          <span
            onClick={() => setIsVideoSliderOpen(true)}
            style={{
              cursor: "pointer",
              opacity: isVideoSliderOpen ? 1 : 0.5,
              marginLeft: hasImages ? 16 : 0,
            }}
          >
            {t?.eventsPageVideo || "Video"}
          </span>
        )}
      </div>

      {!isVideoSliderOpen && hasImages ? (
        <Swiper
          slidesPerView={1.8}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 1, spaceBetween: 20 },
            1024: { slidesPerView: 1.8, spaceBetween: 20 },
          }}
          speed={2000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          centeredSlides
          pagination={{ clickable: true, el: ".blogDetail-custom-pagination" }}
          modules={[Autoplay, Pagination]}
          className="mySwiper blogSwiper"
        >
          {blogDetail.image_gallery.map((img, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`https://admin.adentta.az/storage${img}`}
                className="blogSliderGalleryImg"
                data-fancybox="gallery"
              >
                <Image
                  src={`https://admin.adentta.az/storage${img}`}
                  className="blogSliderCardImg"
                  alt="gallery"
                  width={400}
                  height={400}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : !hasImages && hasVideo ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          speed={2000}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          centeredSlides
          modules={[Autoplay, Pagination]}
          className="mySwiper blogSwiper"
        >
          <SwiperSlide>
            <Link
              href={blogDetail.video_url || "#"}
              className="blogSliderGalleryImg emblem"
              data-fancybox="videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`https://admin.adentta.az/storage${blogDetail.video_cover}`}
                className="blogSliderCardImgVideo"
                alt="video cover"
                width={850}
                height={800}
              />
              <div className="eventsPageAdressVideoText">
                <div className="eventsPagePlayIcon">
                  <Image
                    src="/icons/videoPlayIcon.svg"
                    alt="play"
                    width={28}
                    height={28}
                  />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      ) : null}

      <div className="blogDetail-custom-pagination" />

      <div className="detailPageSocialLinks">
        <div className="socialLinkLine" />
        <div className="detailPageSocialLink">
          <Link href="#" onClick={handleCopy}>
            <span>
              <Image
                src="/icons/copyBold.svg"
                alt="copy"
                width={10}
                height={10}
              />
            </span>
          </Link>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <Image
                src="/icons/facebooklightBlue.svg"
                alt="facebook"
                width={10}
                height={10}
              />
            </span>
          </Link>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <Image
                src="/icons/twitter.svg"
                alt="twitter"
                width={10}
                height={10}
              />
            </span>
          </Link>
          <Link
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <Image
                src="/icons/linkedinlightBlue.svg"
                alt="linkedin"
                width={10}
                height={10}
              />
            </span>
          </Link>
        </div>
        <div className="socialLinkLine" />
      </div>
    </>
  );
};

export default BlogDetailSlider;







