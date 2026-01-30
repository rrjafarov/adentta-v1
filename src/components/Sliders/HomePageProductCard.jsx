// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import { Pagination, Autoplay } from "swiper/modules";
// import Link from "next/link";
// import Image from "next/image";
// import Manat from "../../../public/icons/manat.svg";
// import "../../app/[locale]/globals.scss";

// // utils/slugify.js (və ya komponentdə)
// const slugify = (text) => {
//   if (!text) return "";
//   return (
//     String(text)
//       .toLowerCase()
//       .normalize("NFKD")
//       // türk/utf xarakterləri təmizləmə
//       .replace(/[\u0300-\u036f]/g, "")
//       // slash-i ayrıca tire ilə əvəz et (və bütün icazəsiz simvolları tire et)
//       .replace(/[\/\\]+/g, "-")
//       .replace(/[^a-z0-9-]+/g, "-")
//       .replace(/--+/g, "-")
//       .replace(/^-+|-+$/g, "")
//   );
// };

// const HomePageProductCard = ({ productData, t }) => {
//   return (
//     <div className="container swiperjs homePageProductCardAll">
//       <Swiper
//         slidesPerView={4}
//         spaceBetween={20}
//         loop
//         pagination={{ clickable: true, el: ".my-custom-pagination" }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         speed={1000}
//         breakpoints={{
//           340: { slidesPerView: 1.5, spaceBetween: 20, centeredSlides: true },
//           640: { slidesPerView: 3, spaceBetween: 16 },
//           991: { slidesPerView: 3, spaceBetween: 20 },
//           1024: { slidesPerView: 3, spaceBetween: 20 },
//           1440: { slidesPerView: 4, spaceBetween: 20 },
//         }}
//         modules={[Pagination, Autoplay]}
//         className="mySwiper homePageProductCard"
//         id="homePageHero"
//       >
//         {productData.slice(0, 5).map((product) => (
//           <SwiperSlide key={product.id}>
//             <Link
//               href={`/products/${slugify(product.title || "")}-${product.id}`}
//               className="block"
//             >
//               <div className="homePageProductCardContent">
//                 <div className="homePageProCardImgs">
//                   <div className="homePageProductCardContentImage">
//                     <Image
//                       src={
//                         product?.image
//                           ? `https://admin.adentta.az/storage${product.image}`
//                           : "/images/adenttaDefaultImg.svg"
//                       }
//                       alt={product?.title || "Product image"}
//                       width={800}
//                       height={800}
//                       priority
//                       unoptimized
//                     />
//                   </div>
//                 </div>
//                 <div className="homePageProductCardContentInner">
//                   <div className="homePageProductCardContentText">
//                     <span>{product.title}</span>
//                   </div>
//                   <div className="price">
//                     <div className="priceItem">
//                       <strong id="prices">{product.price}</strong>
//                       <Manat />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="homePageProductCardContentBottom">
//                   <span>{t?.learnMore || "Learn More"}</span>
//                   <img src="/icons/arrowTopRight.svg" alt="arrow" />
//                 </div>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <div className="my-custom-pagination"></div>
//     </div>
//   );
// };

// export default HomePageProductCard;







































"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import Image from "next/image";
import Manat from "../../../public/icons/manat.svg";
import "../../app/[locale]/globals.scss";

const slugify = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\/\\]+/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const HomePageProductCard = ({ productData = [], t }) => {
  const visibleProducts = productData.slice(0, 5);

  return (
    <div className="container swiperjs homePageProductCardAll">
      {visibleProducts.length > 0 ? (
        <>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            loop
            pagination={{ clickable: true, el: ".my-custom-pagination" }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={1000}
            breakpoints={{
              340: { slidesPerView: 1.5, spaceBetween: 20, centeredSlides: true },
              640: { slidesPerView: 3, spaceBetween: 16 },
              991: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1440: { slidesPerView: 4, spaceBetween: 20 },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper homePageProductCard"
            id="homePageHero"
          >
            {visibleProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Link
                  href={`/products/${slugify(product.title)}-${product.id}`}
                  className="block"
                >
                  <div className="homePageProductCardContent">
                    <div className="homePageProCardImgs">
                      <div className="homePageProductCardContentImage">
                        <Image
                          src={
                            product?.image
                              ? `https://admin.adentta.az/storage${product.image}`
                              : "/images/adenttaDefaultImg.svg"
                          }
                          alt={product?.title || "Product image"}
                          width={800}
                          height={800}
                          priority
                          unoptimized
                        />
                      </div>
                    </div>

                    <div className="homePageProductCardContentInner">
                      <div className="homePageProductCardContentText">
                        <span>{product.title}</span>
                      </div>

                      <div className="price">
                        <div className="priceItem">
                          <strong id="prices">{product.price}</strong>
                          <Manat />
                        </div>
                      </div>
                    </div>

                    <div className="homePageProductCardContentBottom">
                      <span>{t?.learnMore || "Learn more"}</span>
                      <img src="/icons/arrowTopRight.svg" alt="arrow" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="my-custom-pagination"></div>
        </>
      ) : (
        // 🔻 Məhsul tapılmadıqda çıxan hissə
        <div className="newSpinners notFoundSmooth flex flex-col items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
          </svg>

          <p className="text-xl text-gray-600">
            {t?.productsNotFound || "Product not found"}
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePageProductCard;
