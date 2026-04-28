
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import ReactSelectCountrySelect from "./ReactSelectCountrySelect";
// import ReactSelectCategoryType from "./ReactSelectCategoryType";

// const Brands = ({ brandsData, t }) => {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const filteredBrands = brandsData.filter((brand) => {
//     // Ölkə filtri - array olub-olmadığını yoxlayırıq
//     const matchesCountry = selectedCountry
//       ? Array.isArray(brand.country) && brand.country.some(
//           (country) => country.id === selectedCountry.value
//         )
//       : true;

//     // Kategoriya filtri - array olub-olmadığını yoxlayırıq
//     const matchesCategory = selectedCategory
//       ? Array.isArray(brand.category) && brand.category.some(
//           (category) => category.id === selectedCategory.value
//         )
//       : true;

//     return matchesCountry && matchesCategory;
//   });

//   return (
//     <div>
//       <div className="container">
//         <div className="brandsTop topper">
//           <Link href="/">
//             <strong className="topper">Adentta</strong>
//           </Link>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span className="topper">{t?.brands || "Brands"}</span>
//         </div>

//         <div className="brandPageHeaderText">
//           <span>{t?.brands || "Brands"}</span>
//           <h1>{t?.brands || "Brands"}</h1>

//           <div className="brandPageSelectButtons">
//             <div className="brandSelects">
//               <div className="brandSelect brandSelectDentist">
//                 <ReactSelectCountrySelect
//                   onChange={(value) => setSelectedCountry(value)}
//                   t={t}
//                 />
//               </div>
//               <div className="brandSelect">
//                 <ReactSelectCategoryType
//                   onChange={(value) => setSelectedCategory(value)}
//                   t={t}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div id="brandsPageCards">
//           <div className="row">
//             {filteredBrands.map((brand) => (
//               <div key={brand.id} className="xl-3 lg-3 md-6 sm-12">
//                 <Link
//                   href={`/brands/${brand?.title?.toLowerCase()
//                     .replace(/\s+/g, "-")}-${brand.id}`}
//                   className="block"
//                 >
//                   <div className="brandsPageCards">
//                     <div className="brandsPageCard">
//                       <div className="brandsPageCardImg">
//                         {brand.logo && (
//                           <Image
//                             src={`https://admin.adentta.az/storage${brand.logo}`}
//                             alt={brand.title}
//                             width={500}
//                             height={500}
//                           />
//                         )}
//                       </div>
//                       <div className="brandsPageCardText">
//                         <span>{brand.title}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Brands;










// ! Yeni  fast version
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ReactSelectCountrySelect from "./ReactSelectCountrySelect";
import ReactSelectCategoryType from "./ReactSelectCategoryType";
import axiosInstance from "@/lib/axios";

const Brands = ({ initialBrandsData = [], t }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [list, setList] = useState(initialBrandsData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  const fetchingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || fetchingRef.current) return;
    setLoading(true);
    fetchingRef.current = true;

    try {
      const nextPage = page + 1;
      const res = await axiosInstance.get(`/page-data/brands?page=${nextPage}`);
      const newData = res?.data?.data?.data || res?.data?.data || [];

      if (!newData || newData.length === 0) {
        setHasMore(false);
      } else {
        setList((prev) => [...prev, ...newData]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error("loadMore error:", err);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            loadMore();
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore, loading]);

  const filteredBrands = useMemo(() => {
    return list.filter((brand) => {
      const matchesCountry = selectedCountry
        ? Array.isArray(brand.country) &&
          brand.country.some((country) => country.id === selectedCountry.value)
        : true;

      const matchesCategory = selectedCategory
        ? Array.isArray(brand.category) &&
          brand.category.some((category) => category.id === selectedCategory.value)
        : true;

      return matchesCountry && matchesCategory;
    });
  }, [list, selectedCountry, selectedCategory]);

  return (
    <div>
      <div className="container">
        <div className="brandsTop topper">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{t?.brands || "Brands"}</span>
        </div>

        <div className="brandPageHeaderText">
          <span>{t?.brands || "Brands"}</span>
          <h1>{t?.brands || "Brands"}</h1>

          <div className="brandPageSelectButtons">
            <div className="brandSelects">
              <div className="brandSelect brandSelectDentist">
                <ReactSelectCountrySelect
                  onChange={(value) => setSelectedCountry(value)}
                  t={t}
                />
              </div>
              <div className="brandSelect">
                <ReactSelectCategoryType
                  onChange={(value) => setSelectedCategory(value)}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>

        <div id="brandsPageCards">
          <div className="row">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="xl-3 lg-3 md-6 sm-12">
                <Link
                  href={`/brands/${brand?.title
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}-${brand.id}`}
                  className="block"
                >
                  <div className="brandsPageCards">
                    <div className="brandsPageCard">
                      <div className="brandsPageCardImg">
                        {brand.logo && (
                          <Image
                            src={`https://admin.adentta.az/storage${brand.logo}`}
                            alt={brand.title}
                            width={500}
                            height={500}
                          />
                        )}
                      </div>
                      <div className="brandsPageCardText">
                        <span>{brand.title}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "40px 0",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  border: "6px solid #f3f3f3",
                  borderTop: "6px solid #293881",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          )}

          <div ref={sentinelRef} style={{ height: 1 }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Brands;