import Image from "next/image";
import Link from "next/link";
import React from "react";
import Manat from "../../../public/icons/manat.svg";

const ProductCardFast = ({ id, title, image, price, oldPrice, t, slugify }) => {
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


      {Number(price) > 0 && (
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
