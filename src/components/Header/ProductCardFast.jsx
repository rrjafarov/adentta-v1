"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Manat from "../../../public/icons/manat.svg";
import { useState, useEffect } from "react";

const PriceInquiryCard = ({ t, whatsappNumber, title, slug }) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(`${window.location.origin}${slug}`);
    }
  }, [slug]);

  const message = encodeURIComponent(
    `${
      t?.priceWhatsappMessage ||
      "Salam, bu məhsulun qiyməti haqqında məlumat ala bilərəm?"
    }
    ${title} 
    ${currentUrl}`,
  );

  return (
    <div className="productsQueryButton">
      <Link
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        prefetch={false}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>{t?.priceMessage}</button>
      </Link>
    </div>
  );
};

const ProductCardFast = ({
  id,
  title,
  image,
  price,
  oldPrice,
  t,
  slugify,
  whatsappNumber,
}) => {
  const productSlug = slugify(title);

  return (
    <div className="productCardFastCard">
      <Link href={`/products/${productSlug}-${id}`}>
        <div className="productCardFastCardImage">
          <Image
            src={image}
            alt={title || "Product image"}
            width={800}
            height={800}
          />
        </div>
      </Link>
      <div className="productCardFastCardContent">
        <span>{title}</span>
      </div>

      {Number(price) > 0 ? (
        <div className="productCardFastCardContentPrice">
          <div className="productCardFastCardContentPriceItem">
            <strong id="prices">{price}</strong>
            <Manat />
          </div>

          {Number(oldPrice) > 0 && (
            <div className="productCardFastCardContentOldPriceItem">
              <strong id="prices">{oldPrice}</strong>
              <Manat />
            </div>
          )}
        </div>
      ) : (
        <PriceInquiryCard
          t={t}
          whatsappNumber={whatsappNumber}
          title={title}
          slug={`/products/${productSlug}-${id}`}
        />
      )}
      <div className="productCardFastCardLearnmore">
        <Link href={`/products/${productSlug}-${id}`}>
          <span>{t?.learnMore || "Learn more"}</span>
          <img src="/icons/arrowTopRight.svg" alt="arrow" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCardFast;
