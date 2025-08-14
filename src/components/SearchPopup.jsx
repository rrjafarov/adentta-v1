
//! kapitalist amerika 09.07

// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axios";

// export default function SearchPopup({ t, closePopup }) {
//   const router = useRouter();

//   const [productData, setProductData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [debounceTimeout, setDebounceTimeout] = useState(null);
//   const [showDoctors, setShowDoctors] = useState(false);
//   const [showEvents, setShowEvents] = useState(false);

//   // Fetch ve filtreleme
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/page-data/product?per_page=12&search_text=${encodeURIComponent(searchTerm)}`
//         );
//         const products = res.data.data?.data || [];
//         setProductData(products);
//         setFilteredProducts(products);
//       } catch (error) {
//         console.error("API'da data yoxdur", error);
//       }
//     };

//     if (searchTerm.trim() !== "") {
//       if (debounceTimeout) clearTimeout(debounceTimeout);

//       const timeout = setTimeout(() => {
//         fetchData();
//       }, 300);

//       setDebounceTimeout(timeout);
//     } else {
//       setFilteredProducts([]);
//     }

//     return () => clearTimeout(debounceTimeout);
//   }, [searchTerm]);

//   useEffect(() => {
//     setFilteredProducts(
//       productData.filter((product) =>
//         product.title?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, productData]);

//   // Doktor ve event gecikmeleri
//   useEffect(() => {
//     setShowDoctors(false);
//     setShowEvents(false);

//     const doctorTimer = setTimeout(() => setShowDoctors(true), 1000);
//     const eventTimer = setTimeout(() => setShowEvents(true), 1500);

//     return () => {
//       clearTimeout(doctorTimer);
//       clearTimeout(eventTimer);
//     };
//   }, [filteredProducts]);

//   const handleOverlayClick = (event) => {
//     if (event.target.classList.contains("overlay")) {
//       closePopup();
//     }
//   };

//   // Enter tuşu ile yönlendirme
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && searchTerm.trim() !== "") {
//       router.push(`/products?per_page=12&search_text=${encodeURIComponent(searchTerm)}`);
//       closePopup();
//     }
//   };

//   return (
//     <div>
//       <div onClick={handleOverlayClick} className="overlay">
//         <div className="searchPopup">
//           <div className="searchPopupHeader">
//             <img onClick={closePopup} src="/icons/popupCloseIcon.svg" alt="close" />
//           </div>
//           <div className="searchPopupInner">
//             <div className="searchingInput">
//               <img src="/icons/searchIcon.svg" alt="search" />
//               <input
//                 type="text"
//                 placeholder={t?.searchPleaceholder || "Search..."}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyDown={handleKeyDown}
//               />
//             </div>

//             <div className="searchBottomLine"></div>

//             <div className="searchPopupContentAll">
//               <span>{t?.searchResults || "Search results"}</span>

//               {searchTerm.trim() === "" ? (
//                 <p className="infoMessageSearch">{t?.searchText || "Search"}</p>
//               ) : filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <Link
//                     key={product.id}
//                     href={`/products/${product.title
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}-${product.id}`}
//                   >
//                     <div className="searchPopupContent">
//                       <div className="productInfo">
//                         <h3>{product.title}</h3>
//                         <div className="searchPopupContentInner">
//                           <img
//                             src={`https://admin.adentta.az/storage${product.image}`}
//                             alt={product.title}
//                           />
//                           <p dangerouslySetInnerHTML={{ __html: product.content }} />
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))
//               ) : (
//                 <p className="infoMessageSearch">{t?.searchNoResults || "No results found"}</p>
//               )}

//               <div className="popupSeeMore">
//                 <Link
//                   href={`/products?per_page=12&search_text=${encodeURIComponent(searchTerm)}`}
//                 >
//                   {t?.searchShowMore || "Show more"}
//                 </Link>
//                 <img src="/icons/arrowTopRight.svg" alt="arrow" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// ! olsun kominizm


"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function SearchPopup({ t, closePopup }) {
  const router = useRouter();

  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [showDoctors, setShowDoctors] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  // Güvənli slug yaratma (slash və digər xüsusi simvolları - ilə əvəz edir)
  const slugify = (str) => {
    if (!str) return "";
    return str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")         // boşluqları -
      .replace(/[^a-z0-9-]/g, "-") // hər şeyi a-z,0-9 və - xaricində -
      .replace(/-+/g, "-")         // çoxlu - => bir -
      .replace(/^-|-$/g, "");      // baş və sondakı - sil
  };

  // Fetch ve filtreleme
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/page-data/product?per_page=12&search_text=${encodeURIComponent(searchTerm)}`
        );
        const products = res.data.data?.data || [];
        setProductData(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("API'da data yoxdur", error);
      }
    };

    if (searchTerm.trim() !== "") {
      if (debounceTimeout) clearTimeout(debounceTimeout);

      const timeout = setTimeout(() => {
        fetchData();
      }, 300);

      setDebounceTimeout(timeout);
    } else {
      setFilteredProducts([]);
    }

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  useEffect(() => {
    setFilteredProducts(
      productData.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, productData]);

  // Doktor ve event gecikmeleri
  useEffect(() => {
    setShowDoctors(false);
    setShowEvents(false);

    const doctorTimer = setTimeout(() => setShowDoctors(true), 1000);
    const eventTimer = setTimeout(() => setShowEvents(true), 1500);

    return () => {
      clearTimeout(doctorTimer);
      clearTimeout(eventTimer);
    };
  }, [filteredProducts]);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("overlay")) {
      closePopup();
    }
  };

  // Enter tuşu ile yönlendirme
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/products?per_page=12&search_text=${encodeURIComponent(searchTerm)}`);
      closePopup();
    }
  };

  return (
    <div>
      <div onClick={handleOverlayClick} className="overlay">
        <div className="searchPopup">
          <div className="searchPopupHeader">
            <img onClick={closePopup} src="/icons/popupCloseIcon.svg" alt="close" />
          </div>
          <div className="searchPopupInner">
            <div className="searchingInput">
              <img src="/icons/searchIcon.svg" alt="search" />
              <input
                type="text"
                placeholder={t?.searchPleaceholder || "Search..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="searchBottomLine"></div>

            <div className="searchPopupContentAll">
              <span>{t?.searchResults || "Search results"}</span>

              {searchTerm.trim() === "" ? (
                <p className="infoMessageSearch">{t?.searchText || "Search"}</p>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  // Ən təhlükəsiz slug: backend-dən gələn slug varsa onu istifadə et, yoxdursa bizim slugify
                  const safeSlug =
                    (product.slug && slugify(product.slug)) ||
                    slugify(product.title) ||
                    String(product.id);

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${safeSlug}-${product.id}`}
                    >
                      <div className="searchPopupContent">
                        <div className="productInfo">
                          <h3>{product.title}</h3>
                          <div className="searchPopupContentInner">
                            <img
                              src={`https://admin.adentta.az/storage${product.image}`}
                              alt={product.title}
                            />
                            <p dangerouslySetInnerHTML={{ __html: product.content }} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
                
              ) : (
                <p className="infoMessageSearch">{t?.searchNoResults || "No results found"}</p>
              )}

              <div className="popupSeeMore">
                <Link
                  href={`/products?per_page=12&search_text=${encodeURIComponent(searchTerm)}`}
                >
                  {t?.searchShowMore || "Show more"}
                </Link>
                <img src="/icons/arrowTopRight.svg" alt="arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
