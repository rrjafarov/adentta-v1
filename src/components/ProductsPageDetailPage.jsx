"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Thumbnail from "./Sliders/Thumbnail";
import Manat from "../../public/icons/manat.svg";
import ProductCardFast from "@/components/Header/ProductCardFast";

const WpLink = ({ t, whatsappNumber }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  const message = encodeURIComponent(
    `${
      t?.wpMessage || "Salam, bu məhsul haqqında məlumat ala bilərəm?"
    }: ${currentUrl}`,
  );
  return (
    <div className="detailPageClickToWhatsapp">
      <span>{t?.clickToOrder || "ClickToOrder"}</span>

      <Link
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        prefetch={false}
        target="_blank"
        rel="noopener noreferrer"
        className="wpButton"
      >
        <div className="dpWP">
          <img src="/icons/whiteWP.svg" alt="WhatsApp Icon" />
          <span>Whatsapp</span>
        </div>
      </Link>
    </div>
  );
};

const PriceInquiry = ({ t, whatsappNumber, productData }) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const message = encodeURIComponent(
    `${
      t?.priceWhatsappMessage ||
      "Salam, bu məhsulun qiyməti haqqında məlumat ala bilərəm?"
    }

    ${productData.title} 
    ${currentUrl}`,
  );

  return (
    <div className="detailPagePriceInqury">
      <Link
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        prefetch={false}
        target="_blank"
        rel="noopener noreferrer"
        className="dpPriceItem"
      >
        <span>{t?.priceMessage}</span>
      </Link>
    </div>
  );
};

const DetailPageAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion">
      <h3 className="accordion-header-dp" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
          alt="Toggle Icon"
          className="toggle-icon"
        />
        {title}
      </h3>
      {isOpen && <div className="accordion-content-dp">{children}</div>}
    </div>
  );
};

const ProductsPageDetailPage = ({
  t,
  whatsappNumber,
  productData,
  similarProducts = [],
  cardsData,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [lastViewed, setLastViewed] = useState([]);

  const hasPrice =
    productData?.price !== undefined &&
    productData?.price !== null &&
    Number(productData.price) > 0;

  // capture current URL
  useEffect(() => {
    if (typeof window !== "undefined") setCurrentUrl(window.location.href);
  }, []);

  // update last-viewed list in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = JSON.parse(localStorage.getItem("lastViewed") || "[]");
    const updated = [
      {
        id: productData.id,
        title: productData.title,
        image: productData.photo || productData.image,
        price: productData.price,
      },
      ...stored.filter((p) => p.id !== productData.id),
    ].slice(0, 4);
    localStorage.setItem("lastViewed", JSON.stringify(updated));
    setLastViewed(updated);
  }, [productData]);

  const shareUrls = {
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      currentUrl,
    )}&text=${encodeURIComponent(productData.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}"e=${encodeURIComponent(productData.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl,
    )}&title=${encodeURIComponent(
      productData.title,
    )}&summary=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${productData.title} - ${currentUrl}`,
    )}`,
  };
  const slugify = (text) => {
    if (!text) return "";
    return String(text)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\/\\]+/g, "-") // <-- burada / işarəsini - ilə əvəz edirik
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleCopy = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* Product Detail */}
      <section id="productPageDPsection">
        <div className="container">
          <div className="filterTop dptopper topper ">
            <Link href="/">
              <strong>Adentta</strong>
            </Link>
            <img src="/icons/rightDown.svg" alt="Adentta" />
            <Link href="/products">
              <span>{t?.products || "Products"}</span>
            </Link>
            <img src="/icons/rightDown.svg" alt="Adentta" />
            <Link
              href={`/products?category=${encodeURIComponent(
                productData.categories?.[0]?.url_slug || "",
              )}`}
            >
              <span>{productData.categories?.[0]?.title}</span>
            </Link>
            <img src="/icons/rightDown.svg" alt="Adentta" />
            <span>{productData.title}</span>
          </div>

          <div className="row">
            {/* Left: thumbnails & main image */}
            <div className="xl-6 md-6 lg-6 sm-12">
              <div className="detailPageContainer">
                <Thumbnail
                  t={t}
                  productData={productData}
                  thumbsSwiper={thumbsSwiper}
                  setThumbsSwiper={setThumbsSwiper}
                />
              </div>
            </div>

            {/* Right: info, accordions, share */}
            <div className="xl-6 md-6 lg-6 sm-12">
              <div className="productDetailRight">
                {/* <span>
                  {t?.productsPageProductCode || "Product code"}: #{" "}
                  <span>{productData.code}</span>
                </span> */}
                <div className="productDetailRightTitle">
                  <h1>{productData.title}</h1>

                  <div className="pricesDP">
                    {hasPrice ? (
                      <>
                        <div className="detailPagePrice">
                          <div className="dpPriceItem">
                            <span>{productData.price}</span>
                            <Manat />
                          </div>
                        </div>

                        {productData.old_price &&
                          Number(productData.old_price) > 0 && (
                            <div className="detailPagePrice detailPageOldPrice">
                              <div className="dpPriceItem">
                                <span>{productData.old_price}</span>
                                <Manat />
                              </div>
                            </div>
                          )}
                      </>
                    ) : (
                      <PriceInquiry
                        t={t}
                        whatsappNumber={whatsappNumber}
                        productData={productData}
                      />
                    )}
                  </div>
                  {/* {productData.quantity > 0 && (
                    <div className="detailPageQuantity">
                      <div className="dpQuantityItem">
                        <span>{t?.inStock || "Stoktadır"} : </span>
                      </div>
                    </div>
                  )} */}

                  <div className="detailPageQuantity">
                    <div className="dpQuantityItem">
                      {productData.quantity > 0 ? (
                        <span className="inStockText">
                          {t?.inStock || "Stoktadır"} :
                        </span>
                      ) : (
                        <p className="notAvailableText">
                          {t?.notAviableQuantity || "Mövcud deyil"} :
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="brandAndCountry">
                  {productData?.brands?.[0]?.logo && (
                    <div className="detailBrand">
                      <span>{t?.productsPageBrandName || "Brand Name"}:</span>
                      <div className="detailBrandInner">
                        <Link
                          href={`/brands/${slugify(
                            productData.brands[0].title,
                          )}-${productData.brands[0].id}`}
                          prefetch={false}
                        >
                          <Image
                            src={`https://admin.adentta.az/storage${productData.brands[0].logo}`}
                            alt={productData.brands[0].name || "Brand"}
                            width={400}
                            height={400}
                          />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <WpLink
                  t={t}
                  whatsappNumber={whatsappNumber}
                  productData={productData}
                />

                <div className="detailPageAccordion">
                  {productData?.content && (
                    <DetailPageAccordion
                      title={t?.productsPageAboutProducts || "About products"}
                    >
                      <span className="productCodeDP">
                        {t?.productsPageProductCode || "Product code"}: #{" "}
                        <span>{productData.code}</span>
                      </span>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: productData.content,
                        }}
                      />
                    </DetailPageAccordion>
                  )}
                  <div className="lines" />

                  <DetailPageAccordion
                    title={t?.productsPageDetailsProducts || "Details Products"}
                  >
                    <div className="row">
                      {productData.categories?.[0]?.parent_id?.[0]?.title && (
                        <div className="xl-8 lg-6 md-6 sm-12">
                          <span className="paramTitle">
                            {t?.productsPageDetailsCategory || "Main category"}
                          </span>

                          <div className="productParametrs">
                            <div className="productParametrsItem">
                              <Link
                                href={`/product?category=${encodeURIComponent(
                                  productData.categories?.[0]?.parent_id?.[0]
                                    ?.url_slug || "",
                                )}`}
                              >
                                <span>
                                  {
                                    productData.categories?.[0]?.parent_id?.[0]
                                      ?.title
                                  }
                                </span>
                              </Link>
                            </div>
                          </div>

                          {productData.categories?.[0]?.title && (
                            <div className="productParametrs">
                              <div className="productParametrsItem">
                                <Link
                                  href={`/product?category=${encodeURIComponent(
                                    productData.categories?.[0]?.url_slug || "",
                                  )}`}
                                >
                                  <span>
                                    {productData.categories?.[0]?.title}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {productData.sizes?.[0]?.title && (
                        <div className="xl-4 lg-6 md-6 sm-12">
                          <span className="paramTitle">
                            {t?.productsPageDetailsSize || "Size"}
                          </span>
                          <div className="productParametrs">
                            <div className="productParametrsItem">
                              <span>{productData.sizes?.[0]?.title}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {productData.brands?.[0]?.country?.[0]?.title && (
                        <div className="xl-4 lg-6 md-6 sm-12">
                          <span className="paramTitle">
                            {t?.brandCountry || "Size"}
                          </span>
                          <div className="productParametrs">
                            <div className="productParametrsItem">
                              <span>
                                {productData.brands?.[0]?.country?.[0]?.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </DetailPageAccordion>
                  <div className="lines" />

                  <DetailPageAccordion title={t?.deliver || "Delivery"}>
                    <div className="detailPageDelivery">
                      <div className="littleCartDP">
                        <img
                          src="/icons/timerCarIcon.svg"
                          alt="Delivery Icon"
                        />
                        <div className="littleCartDPinner">
                          <span>{t?.deliver || "Delivery"}</span>
                          <p>{t?.deliveryContent || "Delivery"}</p>
                        </div>
                      </div>
                      <div className="littleCartDP">
                        <img src="/icons/percentIcon.svg" alt="Discount Icon" />
                        <div className="littleCartDPinner">
                          <span>
                            {t?.affordablePrice || "Affrodable Price"}
                          </span>
                          <p>
                            {t?.affordablePriceContent ||
                              "With a 20% down payment"}
                          </p>
                        </div>
                      </div>
                      <div className="littleCartDP">
                        <img
                          src="/icons/servicesStarIcon.svg"
                          alt="Service Icon"
                        />
                        <div className="littleCartDPinner">
                          <span>{t?.ourService || "Our Service"}</span>
                          <p>
                            {t?.ourServiceContent || "Always at your service!"}
                          </p>
                        </div>
                      </div>
                      <div className="littleCartDP">
                        <img
                          src="/icons/educationIcon.svg"
                          alt="Education Icon"
                        />
                        <div className="littleCartDPinner">
                          <span>
                            {t?.traningAndEducation || "Training and Education"}
                          </span>
                          <p>
                            {t?.traningAndEducationContent ||
                              "Practical and theoretical sessions"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DetailPageAccordion>
                  <div className="lines"></div>

                  <DetailPageAccordion
                    title={
                      t?.productsPagePayCards || "Pay in Easy Installments"
                    }
                  >
                    <div className="bankCarts">
                      {cardsData.map((card) => (
                        <div key={card.id} className="bankCart">
                          <img
                            src={`https://admin.adentta.az/storage${card.card_image}`}
                            alt={card.title}
                          />
                        </div>
                      ))}
                    </div>
                  </DetailPageAccordion>
                </div>
              </div>

              <div className="detailPageShareLinks mobileProductLink">
                <span>{t?.productsPageShare || "Share with"}:</span>
                {Object.entries(shareUrls).map(([key, url]) => (
                  <Link
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detailPageShareLink ml-2"
                  >
                    <img src={`/icons/${key}Bold.svg`} alt={key} />
                  </Link>
                ))}
                <button
                  onClick={handleCopy}
                  className="detailPageShareLinkCOPY ml-2"
                >
                  <img src="/icons/copyBold.svg" alt="Copy link" />
                  <span>{t?.copyLink || "copy link"}</span>
                </button>
                {copied && <span className="copy-feedback ml-2">Copied</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section id="detailPagesSimilarsBottom">
          <div className="container">
            <h4>{t?.similars || "Similars"}</h4>
            <div className="row">
              {similarProducts.map((prod) => (
                <div key={prod.id} className="xl-3 lg-3 md-6 sm-6">
                  <ProductCardFast
                    whatsappNumber={whatsappNumber}
                    id={prod.id}
                    title={prod.title}
                    image={
                      prod?.image
                        ? `https://admin.adentta.az/storage${prod.image}`
                        : "/images/adenttaDefaultImg.svg"
                    }
                    price={prod.price}
                    oldPrice={prod.old_price}
                    t={t}
                    slugify={(text) =>
                      text
                        .toLowerCase()
                        .normalize("NFKD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[\/\\]+/g, "-")
                        .replace(/[^a-z0-9-]+/g, "-")
                        .replace(/--+/g, "-")
                        .replace(/^-+|-+$/g, "")
                    }
                  />
                </div>
              ))}
            </div>
            <div className="container line" />
          </div>
        </section>
      )}

      {/* Last Viewed */}
      {lastViewed.length > 0 && (
        <section id="detailPagesSimilarsBottom">
          <div className="container">
            <h4>{t?.lastViewed || "Similars"}</h4>
            <div className="row">
              {lastViewed.map((prod) => (
                <div key={prod.id} className="xl-3 lg-3 md-6 sm-6">
                  <ProductCardFast
                    whatsappNumber={whatsappNumber}
                    id={prod.id}
                    title={prod.title}
                    image={
                      prod?.image
                        ? `https://admin.adentta.az/storage${prod.image}`
                        : "/images/adenttaDefaultImg.svg"
                    }
                    price={prod.price}
                    oldPrice={prod.old_price}
                    t={t}
                    slugify={(text) =>
                      text
                        .toLowerCase()
                        .normalize("NFKD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[\/\\]+/g, "-")
                        .replace(/[^a-z0-9-]+/g, "-")
                        .replace(/--+/g, "-")
                        .replace(/^-+|-+$/g, "")
                    }
                  />
                </div>
              ))}
            </div>
            <div className="container line" />
          </div>
        </section>
      )}
    </>
  );
};

export default ProductsPageDetailPage;
