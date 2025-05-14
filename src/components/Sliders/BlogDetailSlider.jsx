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
// import { LinkOverlay } from "@chakra-ui/react";

// Fancybox.bind("[data-fancybox]", {
//   dragToClose: false,
//   Image: {
//     zoom: false,
//   },
// });

// const BlogDetailSlider = ({ eventsDetail }) => {
//   const [isVideoSliderOpen, setIsVideoSliderOpen] = useState(false);

//   return (
//     <>
//       <div className="blogDetailSliderHeaderText">
//         <span
//           onClick={() => setIsVideoSliderOpen(false)}
//           style={{ cursor: "pointer", opacity: isVideoSliderOpen ? 0.5 : 1 }}
//         >
//           Photo Gallery
//         </span>
//         <p
//           onClick={() => setIsVideoSliderOpen(true)}
//           style={{ cursor: "pointer", opacity: isVideoSliderOpen ? 1 : 0.5 }}
//         >
//           Video
//         </p>
//       </div>

//       {!isVideoSliderOpen ? (
//         <Swiper
//           slidesPerView={1.8}
//           spaceBetween={20}
//           breakpoints={{
//             0: {
//               slidesPerView: 1,
//               spaceBetween: 20,
//             },
//             640: {
//               slidesPerView: 1,
//               spaceBetween: 20,
//             },
//             1024: {
//               slidesPerView: 1.8,
//               spaceBetween: 20,
//             },
//           }}
//           speed={2000}
//           // loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           centeredSlides={true}
//           pagination={{
//             clickable: true,
//             el: ".blogDetail-custom-pagination",
//           }}
//           modules={[Autoplay, Pagination]}
//           className="mySwiper blogSwiper"
//         >
//           {eventsDetail.image_gallery &&
//             eventsDetail.image_gallery.map((img, index) => (
//               <SwiperSlide key={index}>
//                 <Link
//                   href={`https://admin.adentta.az/storage${img}`}
//                   className="blogSliderGalleryImg"
//                   data-fancybox="videos"
//                 >
//                   <Image
//                     src={`https://admin.adentta.az/storage${img}`}
//                     className="blogSliderCardImg"
//                     alt="gallery"
//                     width={400}
//                     height={400}
//                   />
//                 </Link>
//               </SwiperSlide>
//             ))}

//         </Swiper>
//       ) : (
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={20}
//           speed={2000}
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           centeredSlides={true}
//           modules={[Autoplay, Pagination]}
//           className="mySwiper blogSwiper"
//         >
//           <SwiperSlide>
//             <Link
//               href={eventsDetail.video_url || "#"}
//               className="blogSliderGalleryImg"
//               data-fancybox="videos"
//               target="_blank"
//             >
//               <Image
//                 src={`https://admin.adentta.az/storage${eventsDetail.video_cover}`}
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
//           <Link href="/about">
//             <span>
//               <Image
//                 src="/icons/copyBold.svg"
//                 alt="copy"
//                 width={10}
//                 height={10}
//               />
//             </span>
//           </Link>
//           <Link href="/about">
//             <span>
//               <Image
//                 src="/icons/facebooklightBlue.svg"
//                 alt="copy"
//                 width={10}
//                 height={10}
//               />
//             </span>
//           </Link>
//           <Link href="/about">
//             <span>
//               <Image
//                 src="/icons/twitter.svg"
//                 alt="copy"
//                 width={10}
//                 height={10}
//               />
//             </span>
//           </Link>
//           <Link href="/about">
//             <span>
//               <Image
//                 src="/icons/linkedinlightBlue.svg"
//                 alt="copy"
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





// !son versiyan
"use client";
import Image from "next/image";
import React, { useState } from "react";
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
  Image: {
    zoom: false,
  },
});

const BlogDetailSlider = ({ t, eventsDetail }) => {
  const [isVideoSliderOpen, setIsVideoSliderOpen] = useState(false);
  const pathname = usePathname();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl = origin + pathname;

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(currentUrl);
  };

  return (
    <>
      <div className="blogDetailSliderHeaderText">
        <span
          onClick={() => setIsVideoSliderOpen(false)}
          style={{ cursor: "pointer", opacity: isVideoSliderOpen ? 0.5 : 1 }}
        >
          {t?.eventsPagePhoto || "Photo Gallery"}
        </span>
        <p
          onClick={() => setIsVideoSliderOpen(true)}
          style={{ cursor: "pointer", opacity: isVideoSliderOpen ? 1 : 0.5 }}
        >
          {t?.eventsPageVideo || "Video"}
        </p>
      </div>

      {!isVideoSliderOpen ? (
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
          centeredSlides={true}
          pagination={{ clickable: true, el: ".blogDetail-custom-pagination" }}
          modules={[Autoplay, Pagination]}
          className="mySwiper blogSwiper"
        >
          {eventsDetail.image_gallery?.map((img, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`https://admin.adentta.az/storage${img}`}
                className="blogSliderGalleryImg"
                data-fancybox="videos"
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
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          speed={2000}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          centeredSlides={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper blogSwiper"
        >
          <SwiperSlide>
            <Link
              href={eventsDetail.video_url || "#"}
              className="blogSliderGalleryImg"
              data-fancybox="videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`https://admin.adentta.az/storage${eventsDetail.video_cover}`}
                className="blogSliderCardImgVideo"
                alt="gallery"
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
      )}

      <div className="blogDetail-custom-pagination"></div>

      <div className="detailPageSocialLinks">
        <div className="socialLinkLine"></div>
        <div className="detailPageSocialLink">
          {/* Copy URL */}
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
          {/* Facebook */}
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
          {/* Twitter */}
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
          {/* LinkedIn */}
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
        <div className="socialLinkLine"></div>
      </div>
    </>
  );
};

export default BlogDetailSlider;

// !son versiyan
