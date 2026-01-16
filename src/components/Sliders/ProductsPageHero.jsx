// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "../../app/[locale]/globals.scss";
// import { Navigation } from "swiper/modules";
// import Link from "next/link";

// // --- Helper: slugify & slug getter (HeaderMenu ilə eyni məntiq) ---
// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ?? cat?.slug ?? cat?.url ?? cat?.urlSlug ?? slugify(cat?.title ?? "");

// // YALNIZ SLUG (ID YOX)
// const buildCategoryHref = (cat) => {
//   const slug = getCategorySlug(cat) || slugify(String(cat?.title ?? ""));
//   return `/product?category=${encodeURIComponent(slug)}`;
// };

// const ProductsPageHero = ({
//   t,
//   productData,
//   selectedCategory,
//   subcategories,
// }) => {
//   const title =
//     selectedCategory?.title ||
//     t?.productsPageAllEquipments ||
//     "All Equipments Category";
//   const description =
//     selectedCategory?.meta_description ||
//     t?.productsPageHeroText ||
//     "Lorem ipsum dolor sit amet";

//   console.log("Selected Category:", selectedCategory);
//   console.log("Selgory:", subcategories);

//   return (
//     <section id="productsPageHero">
//       <div className="container productsPageHero">
//         <div className="productsPageHeroHeader">
//           <div className="productsPageHeaderText">
//             <h1>{title}</h1>
//             <p>{description}</p>
//           </div>
//           <div className="custom-navigation">
//             <button className="custom-prev">
//               <img src="/icons/leftDownNavigate.svg" alt="prev" />
//             </button>
//             <button className="custom-next">
//               <img src="/icons/rightDownNavigate.svg" alt="next" />
//             </button>
//           </div>
//         </div>

//         <div className="productsPageSlider">
//           <Swiper
//             slidesPerView={6}
//             spaceBetween={10}
//             speed={1000}
//             loop={true}
//             modules={[Navigation]}
//             navigation={{
//               nextEl: ".custom-next",
//               prevEl: ".custom-prev",
//             }}
//             breakpoints={{
//               320: { slidesPerView: 2.3 },
//               480: { slidesPerView: 3.5 },
//               640: { slidesPerView: 4 },
//               768: { slidesPerView: 5 },
//               1024: { slidesPerView: 5 },
//               1280: { slidesPerView: 6 },
//             }}
//             className="mySwiper"
//           >
//             {subcategories?.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <Link href={buildCategoryHref(item)}>
//                   <div className="productsPageSliderItem">
//                     <div className="productsPageSliderInner">
//                       <div className="productsPageSliderItemImage">
//                         <img
//                           src={
//                             item?.image
//                               ? `https://admin.adentta.az/storage${item.icon}`
//                               : "/images/adenttaDefaultImg.svg"
//                           }
//                           alt={item.title}
//                         />
//                       </div>
//                     </div>
//                     <div className="productsPageSliderItemText">
//                       <span>{item.title}</span>
//                     </div>
//                   </div>
//                 </Link>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductsPageHero;
















"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../../app/[locale]/globals.scss";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // əlavə et

// Helper funksiyalar (digər komponentlərdə də var, burada təkrarlayırıq)
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

const getCategorySlug = (cat) =>
  cat?.url_slug ?? cat?.slug ?? cat?.url ?? cat?.urlSlug ?? slugify(cat?.title ?? "");

const normalizeParentIds = (parentRaw) => {
  if (!parentRaw) return [];
  if (Array.isArray(parentRaw)) {
    return parentRaw
      .map((p) => (typeof p === "object" && p !== null ? p.id : p))
      .map((v) => parseInt(v, 10))
      .filter((v) => Number.isFinite(v));
  }
  if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
    const n = parseInt(parentRaw.id, 10);
    return Number.isFinite(n) ? [n] : [];
  }
  const n = parseInt(parentRaw, 10);
  return Number.isFinite(n) ? [n] : [];
};

const buildCategoryHref = (cat) => {
  const slug = getCategorySlug(cat) || slugify(String(cat?.title ?? ""));
  return `/product?category=${encodeURIComponent(slug)}`;
};

const ProductsPageHero = ({
  t,
  productData,
  categoryData, // yeni prop
}) => {
  const searchParams = useSearchParams();

  // Hazırkı URL-dəki bütün category slug-ları oxu
  const categorySlugs = searchParams
    .getAll("category")
    .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
    .filter(Boolean);

  // İlk slug-ı əsas kateqoriya kimi qəbul et (server davranışına uyğundur)
  let selectedCategory = null;
  if (categorySlugs.length > 0) {
    const firstSlug = categorySlugs[0];
    selectedCategory = categoryData.find((c) => getCategorySlug(c) === firstSlug);
  }

  // Sub-kateqoriyaları hesablayırıq (birbaşa uşaqlar)
  let subcategories = [];
  if (selectedCategory) {
    const selId = Number(selectedCategory.id);
    if (Number.isFinite(selId)) {
      subcategories = categoryData.filter((c) => {
        const parents = normalizeParentIds(c.parent_id);
        return parents.includes(selId);
      });
    }
  }

  const title =
    selectedCategory?.title ||
    t?.productsPageAllEquipments ||
    "All Equipments Category";

  const description =
    selectedCategory?.meta_description ||
    t?.productsPageHeroText ||
    "Lorem ipsum dolor sit amet";

  return (
    <section id="productsPageHero">
      <div className="container productsPageHero">
        <div className="productsPageHeroHeader">
          <div className="productsPageHeaderText">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="custom-navigation">
            <button className="custom-prev">
              <img src="/icons/leftDownNavigate.svg" alt="prev" />
            </button>
            <button className="custom-next">
              <img src="/icons/rightDownNavigate.svg" alt="next" />
            </button>
          </div>
        </div>
        <div className="productsPageSlider">
          <Swiper
            slidesPerView={6}
            spaceBetween={10}
            speed={1000}
            loop={true}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              320: { slidesPerView: 2.3 },
              480: { slidesPerView: 3.5 },
              640: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            className="mySwiper"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={buildCategoryHref(item)}>
                  <div className="productsPageSliderItem">
                    <div className="productsPageSliderInner">
                      <div className="productsPageSliderItemImage">
                        <img
                          src={
                            item?.icon
                              ? `https://admin.adentta.az/storage${item.icon}`
                              : "/images/adenttaDefaultImg.svg"
                          }
                          alt={item.title}
                        />
                      </div>
                    </div>
                    <div className="productsPageSliderItemText">
                      <span>{item.title}</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductsPageHero;