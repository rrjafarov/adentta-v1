import Image from "next/image";
import React from "react";

const PdfCatalogCards = () => {
  return (
    <div className="pdfCatalogCard">
      <div className="pdfCatalogCardImg">
        <Image
          src="/images/pdfCatalogCardIMG.png"
          alt="catalog"
          width={300}
          height={300}
        />
        <div className="vatech">
          <span>Vatech</span>
        </div>
      </div>
      <div className="pdfCatalogCardInfo">
        <div className="pdfCatalogCardInfoContent">
          <span>PDF catalog name 01</span>
          <p>
            Lorem Ipsum as their default modEnglish. Many desktop publishing
            packages and web page editor
          </p>
          <button>
            Download PDF
            <Image
              src="/icons/downloadIcon.svg"
              alt="download"
              width={100}
              height={100}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfCatalogCards;
