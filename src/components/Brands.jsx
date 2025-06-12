// ! son versiya

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import ReactSelectDrop from "./ReactSelectDrop";
// import ReactSelectCountrySelect from "./ReactSelectCountrySelect";
// import ReactSelectCategoryType from "./ReactSelectCategoryType";

// const Brands = ({ brandsData, t }) => {
//   // ✅ Ölkə seçimi üçün state
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   // ✅ Ölkəyə görə filterləmə
//   const filteredBrands = selectedCountry
//   ? brandsData.filter((brand) =>
//       brand.country?.some(
//         (country) => country.title === selectedCountry.label
//       )
//     )
//   : brandsData;

//   return (
//     <div>
//       <div className="container">
//         <div className="doctorsTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4 className="topper">{t?.brands || "Brands"}</h4>
//         </div>

//         <div className="doctorsPageHeaderText">
//           <span>{t?.brands || "Brands"}</span>
//           <h2>{t?.brands || "Brands"}</h2>

//           <div className="doctorsPageSelectButtons">
//             <div className="doctorsSelects">
//               <div className="doctorsSelect doctorsSelectDentist">
//                 {/* ✅ Ölkə seçildikdə state yenilənir */}
//                 <ReactSelectCountrySelect
//                   onChange={(value) => setSelectedCountry(value)}
//                 />
//               </div>
//               <div className="doctorsSelect">
//                 <ReactSelectCategoryType />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div id="brandsPageCards">
//           <div className="row">
//             {/* ✅ filteredBrands ilə map olunur */}
//             {filteredBrands.map((brand) => (
//               <div key={brand.id} className="xl-3 lg-3 md-6 sm-12">
//                 <Link
//                   href={`/brands/${brand.title
//                     .toLowerCase()
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
//                             width={400}
//                             height={400}
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

// ! son versiya

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ReactSelectDrop from "./ReactSelectDrop";
import ReactSelectCountrySelect from "./ReactSelectCountrySelect";
import ReactSelectCategoryType from "./ReactSelectCategoryType";

const Brands = ({ brandsData, t }) => {
  // ✅ Ölkə seçimi üçün state
  const [selectedCountry, setSelectedCountry] = useState(null);
  // ✅ Kategoriya seçimi üçün state
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ Ölkə və Kategoriya seçilməsinə görə filterləmə
  const filteredBrands = brandsData.filter((brand) => {
    const matchesCountry = selectedCountry
      ? brand.country?.some(
          (country) => country.title === selectedCountry.label
        )
      : true;
    const matchesCategory = selectedCategory
      ? brand.category?.some(
          (category) => category.title === selectedCategory.label
        )
      : true;

    return matchesCountry && matchesCategory;
  });

  return (
    <div>
      <div className="container">
        <div className="doctorsTop topper">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{t?.brands || "Brands"}</h4>
        </div>

        <div className="doctorsPageHeaderText">
          <span>{t?.brands || "Brands"}</span>
          <h2>{t?.brands || "Brands"}</h2>

          <div className="doctorsPageSelectButtons">
            <div className="doctorsSelects">
              <div className="doctorsSelect doctorsSelectDentist">
                {/* ✅ Ölkə seçildikdə state yenilənir */}
                <ReactSelectCountrySelect
                  onChange={(value) => setSelectedCountry(value)}
                  t={t} // Ölkə seçimi
                />
              </div>
              <div className="doctorsSelect">
                {/* ✅ Kategoriya seçildikdə state yenilənir */}
                <ReactSelectCategoryType
                  onChange={(value) => setSelectedCategory(value)}
                  t={t} // Kategoriya seçimi
                />
              </div>
            </div>
          </div>
        </div>

        <div id="brandsPageCards">
          <div className="row">
            {/* ✅ filteredBrands ilə map olunur */}
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="xl-3 lg-3 md-6 sm-12">
                <Link
                  href={`/brands/${brand?.title?.toLowerCase()
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
        </div>
      </div>
    </div>
  );
};

export default Brands;
