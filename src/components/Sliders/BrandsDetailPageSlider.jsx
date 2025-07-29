// "use client";
// import Image from "next/image";
// import React, { useState, useRef } from "react";
// import Link from "next/link";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// // import "../../app/globals.scss";
// import "../../app/[locale]/globals.scss";
// import { Autoplay, Navigation } from "swiper/modules";

// Fancybox.bind("[data-fancybox]", {
//   dragToClose: false,
//   Image: {
//     zoom: false,
//   },
// });

// const CareersPageSlider = ({brandsDetailDataDetail}) => {
  
//   return (
//     <>
//       <Swiper
//         slidesPerView={4}
//         spaceBetween={20}
//         speed={2000}
//         loop={true}
//         centeredSlides={true}
//         modules={[Navigation, Autoplay]}
//         navigation={{
//           nextEl: ".careersCustom-next",
//           prevEl: ".careersCustom-prev",
//         }}
//         breakpoints={{
//           320: { slidesPerView: 2},
//           480: { slidesPerView: 2 },
//           640: { slidesPerView: 3 },
//           767: { slidesPerView: 3 },
//           1024: { slidesPerView: 4 },
//           1280: { slidesPerView: 4 },
//         }}
//         className="mySwiper careersSwiper"
//       >
//         <SwiperSlide>
//           <Link
//             href="/images/brandsSliderIMG.png"
//             className="careersSliderGalleryImg"
//             data-fancybox="videos"
//           >
//             {/* <div className="videoGaleryImg"> */}
//             <Image
//               src="/images/brandsSliderIMG.png"
//               // effect="blur"
//               className="careersSliderCardImg"
//               alt="22"
//               width={150}
//               height={100}
//               // placeholder="blur"
//               // blurDataURL={Blur.src}
//             />
//             {/* </div> */}
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link
//             href="/images/brandsSliderIMG.png"
//             className="careersSliderGalleryImg"
//             data-fancybox="videos"
//           >
//             <div className="videoGaleryImg">
//               <Image
//                 src="/images/brandsSliderIMG.png"
//                 // effect="blur"
//                 className="careersSliderCardImg"
//                 alt="22"
//                 width={100}
//                 height={100}
//                 // placeholder="blur"
//                 // blurDataURL={Blur.src}
//               />
//             </div>
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link
//             href="/images/brandsSliderIMG.png"
//             className="careersSliderGalleryImg"
//             data-fancybox="videos"
//           >
//             <div className="videoGaleryImg">
//               <Image
//                 src="/images/brandsSliderIMG.png"
//                 // effect="blur"
//                 className="careersSliderCardImg"
//                 alt="22"
//                 width={100}
//                 height={100}
//                 // placeholder="blur"
//                 // blurDataURL={Blur.src}
//               />
//             </div>
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link
//             href="/images/brandsSliderIMG.png"
//             className="careersSliderGalleryImg"
//             data-fancybox="videos"
//           >
//             <div className="videoGaleryImg">
//               <Image
//                 src="/images/brandsSliderIMG.png"
//                 // effect="blur"
//                 className="careersSliderCardImg"
//                 alt="22"
//                 width={100}
//                 height={100}
//                 // placeholder="blur"
//                 // blurDataURL={Blur.src}
//               />
//             </div>
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link
//             href="/images/brandsSliderIMG.png"
//             className="careersSliderGalleryImg"
//             data-fancybox="videos"
//           >
//             <div className="videoGaleryImg">
//               <Image
//                 src="/images/brandsSliderIMG.png"
//                 // effect="blur"
//                 className="careersSliderCardImg"
//                 alt="22"
//                 width={100}
//                 height={100}
//                 // placeholder="blur"
//                 // blurDataURL={Blur.src}
//               />
//             </div>
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link
//             href="/images/brandsSliderIMG.png"
//             className="careersSliderGalleryImg"
//             data-fancybox="videos"
//           >
//             <div className="videoGaleryImg">
//               <Image
//                 src="/images/brandsSliderIMG.png"
//                 // effect="blur"
//                 className="careersSliderCardImg"
//                 alt="22"
//                 width={100}
//                 height={100}
//                 // placeholder="blur"
//                 // blurDataURL={Blur.src}
//               />
//             </div>
//           </Link>
//         </SwiperSlide>
//       </Swiper>

//       <div className="careersCustom-navigation">
//         <button className="careersCustom-prev">
//           <img src="/icons/careersLeftArrow.svg" alt="" />
//         </button>
//         <button className="careersCustom-next">
//           <img src="/icons/careersRightArrow.svg" alt="" />
//         </button>
//       </div>
//     </>
//   );
// };

// export default CareersPageSlider;
































"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../../app/[locale]/globals.scss";
import { Autoplay, Navigation } from "swiper/modules";

// Fancybox konfiqurasiya
Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: {
    zoom: false,
  },
});

const CareersPageSlider = ({ brandsDetailDataDetail }) => {
  // brandsDetailDataDetail obyektindən image_gallery massivini çıxarırıq.
  const imageGallery = brandsDetailDataDetail?.image_gallery || [];

  // Əgər image_gallery boşdursa, slider render olunmur.
  if (imageGallery.length === 0) return null;

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        speed={2000}
        loop={true}
        centeredSlides={true}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".careersCustom-next",
          prevEl: ".careersCustom-prev",
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          767: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
        className="mySwiper careersSwiper"
      >
        {imageGallery.map((image, index) => (
          <SwiperSlide key={index}>
            <Link
              href={`https://admin.adentta.az/storage${image}`}
              className="careersSliderGalleryImg brandsSliderGalleryImgDetail"
              data-fancybox="videos"
            >
              <div className="videoGaleryImg brandsGalleryImgDetail" >
                <Image
                  src={`https://admin.adentta.az/storage${image}`}
                  // className="careersSliderCardImg"
                  alt={`Gallery image ${index + 1}`}
                  width={1200}
                  height={1200}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="careersCustom-navigation">
        <button className="careersCustom-prev">
          <img src="/icons/careersLeftArrow.svg" alt="Previous" />
        </button>
        <button className="careersCustom-next">
          <img src="/icons/careersRightArrow.svg" alt="Next" />
        </button>
      </div>
    </>
  );
};

export default CareersPageSlider;
