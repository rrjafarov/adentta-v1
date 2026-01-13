// "use client";
// import React, { useMemo, useState } from "react";
// import ReactSelectDrop from "./ReactSelectDrop";
// import ReactSelectProductType from "./ReactSelectProductType";
// import Image from "next/image";
// import Link from "next/link";

// const PdfCatalog = ({ t, pdfMembers = [] }) => {
//   const [selectedBrand, setSelectedBrand] = useState(null);
//   const [selectedProductType, setSelectedProductType] = useState(null);


//   const hasProductOptions = useMemo(() => {
//   return (pdfMembers || []).some(
//     (member) =>
//       Array.isArray(member?.product_id) && member.product_id.length > 0
//   );
// }, [pdfMembers]);


//   // Filtrləmə — datadakı strukturuna uyğun
//   const filteredDoctors = useMemo(() => {
//     return (pdfMembers || []).filter((member) => {
//       // BRAND: member.brand_id = [{ title: "Straumann", ... }]
//       const matchesBrand = selectedBrand
//         ? Array.isArray(member?.brand_id) &&
//           member.brand_id.some((b) => b?.title === selectedBrand?.label)
//         : true;

//       // PRODUCT: member.product_id = [{ title: "Carl Martin - Tweezers", ... }]
//       const matchesProductType = selectedProductType
//         ? Array.isArray(member?.product_id) &&
//           member.product_id.some((p) => p?.title === selectedProductType?.label)
//         : true;

//       return matchesBrand && matchesProductType;
//     });
//   }, [pdfMembers, selectedBrand, selectedProductType]);

//   const handleBrandChange = (value) => {
//     setSelectedBrand(value); // null -> All
//   };
//   const handleProductTypeChange = (value) => {
//     setSelectedProductType(value); // null -> All
//   };

//   return (
//     <div id="pdfCatalogPage">
//       <div className="container">
//         <div className="pdfCatalogTop topper">
//           <Link href="/">
//             <strong className="topper">Adentta</strong>
//           </Link>
//           <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
//           <span className="topper">{t?.pdfCatalog || "PDF Catalog"}</span>
//         </div>

//         <div className="pdfCatalogPageHeaderText">
//           <span>{t?.pdfTitle || "PDF"}</span>
//           <h1>{t?.pdfCatalog || "PDF Catalog"}</h1>

//           <div className="pdfCatalogSelects">


//             {hasProductOptions && (
//               <div className="catalogSelect">
//                 <ReactSelectProductType
//                   t={t}
//                   pdfMembers={pdfMembers}
//                   onChange={handleProductTypeChange}
//                 />
//               </div>
//             )}

//             {/* <div className="catalogSelect">
//               <ReactSelectProductType 
//                 t={t}
//                 pdfMembers={pdfMembers}
//                 onChange={handleProductTypeChange}
//               />
//             </div> */}

//             <div className="catalogSelect">
//               <ReactSelectDrop t={t} onChange={handleBrandChange} />
//             </div>
//           </div>
//         </div>

//         <div className="pdfCatalogCards">
//           <div className="row">
//             {filteredDoctors.map((member) => {
//               const imgSrc = member?.image
//                 ? `https://admin.adentta.az/storage${member.image}`
//                 : "/images/placeholder.png";

//               const pdfHref = member?.pdf
//                 ? `https://admin.adentta.az/storage${member.pdf}`
//                 : "#";

//               const brandTitle =
//                 member?.brand_id?.[0]?.title || t?.noBrand || "";

//               return (
//                 <div key={member.id} className="xl-4 lg-4 md-6 sm-12">
//                   <div className="pdfCatalogCard">
//                     <div className="pdfCatalogCardImg">
//                       <Link
//                         href={pdfHref}
//                         target="_blank"
//                         className="pdfCatalogCardImgLink"
//                       >
//                         <Image
//                           src={imgSrc}
//                           alt="catalog"
//                           width={500}
//                           height={500}
//                         />
//                       </Link>

//                       {member?.brand_id?.[0]?.title && (
//                         <div className="vatech">
//                           <span>{brandTitle}</span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="pdfCatalogCardInfo">
//                       <div className="pdfCatalogCardInfoContent">
//                         <h3>{member?.title}</h3>

//                         <div
//                           className="pdfCatalogCardInfoParagraph"
//                           dangerouslySetInnerHTML={{
//                             __html: member?.short_text || "",
//                           }}
//                         ></div>

//                         <Link href={pdfHref} target="_blank" passHref>
//                           <button className="pdfCatalogCardInfoLink">
//                             {t?.pdfPageDownload || "Download PDF"}
//                             <Image
//                               src="/icons/downloadIcon.svg"
//                               alt="download"
//                               width={100}
//                               height={100}
//                             />
//                           </button>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PdfCatalog;








































"use client";
import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import ReactSelectDrop from "./ReactSelectDrop";
import ReactSelectProductType from "./ReactSelectProductType";
import Image from "next/image";
import Link from "next/link";

/**
 * PdfCatalogCard - hər kart üçün mətnin truncated olub-olmadığını ölçür
 * və yalnız lazım olduqda "Daha ətraflı" düyməsini göstərir.
 */
const PdfCatalogCard = ({ member, t, isExpanded, toggleExpand }) => {
  const paragraphRef = useRef(null);
  const measureRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const checkTruncation = useCallback(() => {
    const p = paragraphRef.current;
    const m = measureRef.current;
    if (!p || !m) return;

    // Hidden measure div-ə eyni HTML qoy və onun enini görən elementin eninə çək
    m.innerHTML = p.innerHTML;
    m.style.width = `${p.clientWidth}px`;

    // Tam və görünən hündürlükləri müqayisə et
    const fullHeight = m.offsetHeight;
    const visibleHeight = p.offsetHeight;

    // kiçik tolerantlıq əlavə et (1px)
    setIsTruncated(fullHeight > visibleHeight + 1);
  }, []);

  useEffect(() => {
    // yoxla mount zamanı və mətn dəyişəndə
    checkTruncation();
    // yenidən hesabla: pəncərə resize zamanı
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [checkTruncation, member?.short_text]);

  const imgSrc = member?.image
    ? `https://admin.adentta.az/storage${member.image}`
    : "/images/placeholder.png";

  const pdfHref = member?.pdf
    ? `https://admin.adentta.az/storage${member.pdf}`
    : "#";

  const brandTitle = member?.brand_id?.[0]?.title || t?.noBrand || "";

  return (
    <div className="xl-4 lg-4 md-6 sm-12">
      <div className="pdfCatalogCard">
        <div className="pdfCatalogCardImg">
          <Link href={pdfHref} target="_blank" className="pdfCatalogCardImgLink">
            <Image src={imgSrc} alt="catalog" width={500} height={500} />
          </Link>

          {member?.brand_id?.[0]?.title && (
            <div className="vatech">
              <span>{brandTitle}</span>
            </div>
          )}
        </div>

        <div className={`pdfCatalogCardInfo ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="pdfCatalogCardInfoContent">
            <h3>{member?.title}</h3>

            {/* Görünən paragraf (clamped). Paragraph ref istifadə olunur. */}
            <div
              ref={paragraphRef}
              className={`pdfCatalogCardInfoParagraph ${isExpanded ? "expanded" : "collapsed"}`}
              dangerouslySetInnerHTML={{ __html: member?.short_text || "" }}
            />

            {/* Gizli ölçü elementi — eyni mətnin tam hündürlüyünü ölçmək üçün */}
            <div ref={measureRef} className="pdfCatalogMeasure" aria-hidden="true" />

            {/* "Daha ətraflı" yalnız mətn truncated olanda göstərilsin */}
            {isTruncated && (
              <button
                type="button"
                className="pdfCatalogShowMore"
                onClick={() => toggleExpand(member.id)}
                aria-expanded={isExpanded}
              >
                {isExpanded ? t?.showLess || "gizlət" : t?.showMorePdf || "..daha ətraflı"}
              </button>
            )}

            <Link href={pdfHref} target="_blank" passHref>
              <button className="pdfCatalogCardInfoLink">
                {t?.pdfPageDownload || "Download PDF"}
                <Image src="/icons/downloadIcon.svg" alt="download" width={100} height={100} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const PdfCatalog = ({ t, pdfMembers = [] }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);

  // Expanded cards state (Set of ids)
  const [expandedIds, setExpandedIds] = useState(() => new Set());

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hasProductOptions = useMemo(() => {
    return (pdfMembers || []).some(
      (member) => Array.isArray(member?.product_id) && member.product_id.length > 0
    );
  }, [pdfMembers]);

  // Filtrləmə — datadakı strukturuna uyğun
  const filteredDoctors = useMemo(() => {
    return (pdfMembers || []).filter((member) => {
      const matchesBrand = selectedBrand
        ? Array.isArray(member?.brand_id) &&
          member.brand_id.some((b) => b?.title === selectedBrand?.label)
        : true;

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
            <strong className="topper">Adentta</strong>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{t?.pdfCatalog || "PDF Catalog"}</span>
        </div>

        <div className="pdfCatalogPageHeaderText">
          <span>{t?.pdfTitle || "PDF"}</span>
          <h1>{t?.pdfCatalog || "PDF Catalog"}</h1>

          <div className="pdfCatalogSelects">
            {hasProductOptions && (
              <div className="catalogSelect">
                <ReactSelectProductType t={t} pdfMembers={pdfMembers} onChange={handleProductTypeChange} />
              </div>
            )}

            <div className="catalogSelect">
              <ReactSelectDrop t={t} onChange={handleBrandChange} />
            </div>
          </div>
        </div>

        <div className="pdfCatalogCards">
          <div className="row">
            {filteredDoctors.map((member) => (
              <PdfCatalogCard
                key={member.id}
                member={member}
                t={t}
                isExpanded={expandedIds.has(member.id)}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfCatalog;




