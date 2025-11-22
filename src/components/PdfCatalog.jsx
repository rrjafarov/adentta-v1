// "use client";
// import React, { useState } from "react";
// import ReactSelectDrop from "./ReactSelectDrop";
// import ReactSelectProductType from "./ReactSelectProductType";
// import Image from "next/image";
// import Link from "next/link";

// const PdfCatalog = ({ t, pdfMembers }) => {
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [selectedProductType, setSelectedProductType] = useState(null);

//   const filteredDoctors = pdfMembers.filter((doctor) => {
//     const matchesBrand = selectedBrand
//       ? doctor.brand_id?.some((brand) => brand.title === selectedBrand.label)
//       : true;

//     const matchesProductType = selectedProductType
//       ? doctor.product_id?.some(
//           (product) => product.title === selectedProductType.label
//         )
//       : true;

//     return matchesBrand && matchesProductType;
//   });

//   const handleBrandChange = (value) => {
//     setSelectedBrand(value);
//   };

//   const handleProductTypeChange = (value) => {
//     setSelectedProductType(value);
//   };

//   return (
//     <div id="pdfCatalogPage">
//       <div className="container">
//         <div className="pdfCatalogTop topper">
//           <Link href="/">
//             <h1 className="topper">Adentta</h1>
//           </Link>
//           <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
//           <h4 className="topper">{t?.pdfCatalog || "PDF Catalog"}</h4>
//         </div>
//         <div className="pdfCatalogPageHeaderText">
//           <h2>{t?.pdfTitle || "PDF"}</h2>
//           <span>{t?.pdfCatalog || "PDF Catalog"}</span>

//           <div className="pdfCatalogSelects">
//             <div className="catalogSelect">
//               <ReactSelectProductType
//                 onChange={handleProductTypeChange}
//                 t={t}
//               />
//             </div>
//             <div className="catalogSelect">
//               <ReactSelectDrop t={t} onChange={handleBrandChange} />
//             </div>
//           </div>
//         </div>

//         <div className="pdfCatalogCards">
//           <div className="row">
//             {filteredDoctors.map((member) => (
//               <div key={member.id} className="xl-4 lg-4 md-6 sm-12">
//                 <div className="pdfCatalogCard">
//                   <div className="pdfCatalogCardImg">
//                     <Image
//                       src={`https://admin.adentta.az/storage${member.image}`}
//                       alt="catalog"
//                       width={300}
//                       height={300}
//                     />
//                     <div className="vatech">
//                       <span>
//                         {member?.brand_id?.[0]?.title || "Marka yoxdur"}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="pdfCatalogCardInfo">
//                     <div className="pdfCatalogCardInfoContent">
//                       <span>{member.title}</span>
//                       <div
//                         dangerouslySetInnerHTML={{
//                           __html: member.short_text || "",
//                         }}
//                       ></div>
//                       <Link
//                         href={`https://admin.adentta.az/storage${member.pdf}`}
//                         target="_blank"
//                         passHref
//                       >
//                         <button download className="pdfCatalogCardInfoLink">
//                           {t?.pdfPageDownload || "Download PDF"}
//                           <Image
//                             src="/icons/downloadIcon.svg"
//                             alt="download"
//                             width={100}
//                             height={100}
//                           />
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PdfCatalog;

"use client";
import React, { useMemo, useState } from "react";
import ReactSelectDrop from "./ReactSelectDrop";
import ReactSelectProductType from "./ReactSelectProductType";
import Image from "next/image";
import Link from "next/link";

const PdfCatalog = ({ t, pdfMembers = [] }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);


  const hasProductOptions = useMemo(() => {
  return (pdfMembers || []).some(
    (member) =>
      Array.isArray(member?.product_id) && member.product_id.length > 0
  );
}, [pdfMembers]);


  // Filtrləmə — datadakı strukturuna uyğun
  const filteredDoctors = useMemo(() => {
    return (pdfMembers || []).filter((member) => {
      // BRAND: member.brand_id = [{ title: "Straumann", ... }]
      const matchesBrand = selectedBrand
        ? Array.isArray(member?.brand_id) &&
          member.brand_id.some((b) => b?.title === selectedBrand?.label)
        : true;

      // PRODUCT: member.product_id = [{ title: "Carl Martin - Tweezers", ... }]
      const matchesProductType = selectedProductType
        ? Array.isArray(member?.product_id) &&
          member.product_id.some((p) => p?.title === selectedProductType?.label)
        : true;

      return matchesBrand && matchesProductType;
    });
  }, [pdfMembers, selectedBrand, selectedProductType]);

  const handleBrandChange = (value) => {
    setSelectedBrand(value); // null -> All
  };
  const handleProductTypeChange = (value) => {
    setSelectedProductType(value); // null -> All
  };

  return (
    <div id="pdfCatalogPage">
      <div className="container">
        <div className="pdfCatalogTop topper">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{t?.pdfCatalog || "PDF Catalog"}</h4>
        </div>

        <div className="pdfCatalogPageHeaderText">
          <h2>{t?.pdfTitle || "PDF"}</h2>
          <span>{t?.pdfCatalog || "PDF Catalog"}</span>

          <div className="pdfCatalogSelects">


            {hasProductOptions && (
              <div className="catalogSelect">
                <ReactSelectProductType
                  t={t}
                  pdfMembers={pdfMembers}
                  onChange={handleProductTypeChange}
                />
              </div>
            )}

            {/* <div className="catalogSelect">
              <ReactSelectProductType 
                t={t}
                pdfMembers={pdfMembers}
                onChange={handleProductTypeChange}
              />
            </div> */}

            <div className="catalogSelect">
              <ReactSelectDrop t={t} onChange={handleBrandChange} />
            </div>
          </div>
        </div>

        <div className="pdfCatalogCards">
          <div className="row">
            {filteredDoctors.map((member) => {
              const imgSrc = member?.image
                ? `https://admin.adentta.az/storage${member.image}`
                : "/images/placeholder.png";

              const pdfHref = member?.pdf
                ? `https://admin.adentta.az/storage${member.pdf}`
                : "#";

              const brandTitle =
                member?.brand_id?.[0]?.title || t?.noBrand || "";

              return (
                <div key={member.id} className="xl-4 lg-4 md-6 sm-12">
                  <div className="pdfCatalogCard">
                    <div className="pdfCatalogCardImg">
                      <Link
                        href={pdfHref}
                        target="_blank"
                        className="pdfCatalogCardImgLink"
                      >
                        <Image
                          src={imgSrc}
                          alt="catalog"
                          width={500}
                          height={500}
                        />
                      </Link>

                      {member?.brand_id?.[0]?.title && (
                        <div className="vatech">
                          <span>{brandTitle}</span>
                        </div>
                      )}
                    </div>

                    <div className="pdfCatalogCardInfo">
                      <div className="pdfCatalogCardInfoContent">
                        <span>{member?.title}</span>

                        <div
                          className="pdfCatalogCardInfoParagraph"
                          dangerouslySetInnerHTML={{
                            __html: member?.short_text || "",
                          }}
                        ></div>

                        <Link href={pdfHref} target="_blank" passHref>
                          <button className="pdfCatalogCardInfoLink">
                            {t?.pdfPageDownload || "Download PDF"}
                            <Image
                              src="/icons/downloadIcon.svg"
                              alt="download"
                              width={100}
                              height={100}
                            />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfCatalog;
