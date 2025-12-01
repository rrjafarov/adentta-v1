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
//         {productData.map((product) => (
//           <SwiperSlide key={product.id}>
//             <Link
//               href={`/products/${product.title
//                 .toLowerCase()
//                 .replace(/\s+/g, "-")}-${product.id}`}
//               className="block"
//             >
//               <div className="homePageProductCardContent">
//                 <div className="homePageProCardImgs">
//                   <div className="homePageProductCardContentImage">
//                     {/* {product.image ? (
//                       <Image
//                         // src={`https://admin.adentta.az/storage${product.image}`}
//                         src={product.image ? `https://admin.adentta.az/storage${product.image}` : '/images/adenttaDefaultImg.svg'}
//                         alt={product.title}
//                         width={800}
//                         height={800}
//                         priority
//                         unoptimized
//                       />
//                     ) : (
//                       <p>NotFound</p>
//                     )} */}

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
//       {/* <div className="my-custom-pagination"></div> */}
//     </div>
//   );
// };

// export default HomePageProductCard;












"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import Manat from "../../../public/icons/manat.svg";
import "../../app/[locale]/globals.scss";

// 🔹 Eyni slugify mentiqi (məhsul title → URL üçün təmiz slug)
const slugify = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const HomePageProductCard = ({ productData, t }) => {
  return (
    <div className="container swiperjs homePageProductCardAll">
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
        {productData.slice(0, 5).map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              href={`/products/${slugify(product.title || "")}-${product.id}`}
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
                  <span>{t?.learnMore || "Learn More"}</span>
                  <img src="/icons/arrowTopRight.svg" alt="arrow" />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="my-custom-pagination"></div>
    </div>
  );
};

export default HomePageProductCard;



















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
//               href={`/products/${product.title
//                 .toLowerCase()
//                 .replace(/\s+/g, "-")}-${product.id}`}
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