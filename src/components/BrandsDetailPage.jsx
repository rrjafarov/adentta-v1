"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import BrandsDetailPageSlider from "@/components/Sliders/BrandsDetailPageSlider";
import { Fancybox } from "@fancyapps/ui";
import Manat from "../../public/icons/manat.svg";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import axiosInstance from "@/lib/axios";
import ProductCardFast from "@/components/Header/ProductCardFast";

Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: {
    zoom: false,
  },
});

const PdfCatalogCard = ({
  member,
  t,
  isExpanded,
  toggleExpand,
  currentBrandTitle,
}) => {
  const paragraphRef = useRef(null);
  const measureRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const checkTruncation = useCallback(() => {
    const p = paragraphRef.current;
    const m = measureRef.current;
    if (!p || !m) return;
    m.innerHTML = p.innerHTML;
    m.style.width = `${p.clientWidth}px`;
    const fullHeight = m.offsetHeight;
    const visibleHeight = p.offsetHeight;
    setIsTruncated(fullHeight > visibleHeight + 1);
  }, []);

  useEffect(() => {
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [checkTruncation, member?.short_text]);

  const imgSrc = member?.image
    ? `https://admin.adentta.az/storage${member.image}`
    : "/images/placeholder.png";
  const pdfHref = member?.pdf
    ? `https://admin.adentta.az/storage${member.pdf}`
    : "#";

  return (
    <div className="xl-4 lg-4 md-6 sm-12">
      <div className="pdfCatalogCard">
        <div className="pdfCatalogCardImg">
          <Link
            href={pdfHref}
            target="_blank"
            className="pdfCatalogCardImgLink"
          >
            <Image src={imgSrc} alt="catalog" width={500} height={500} />
          </Link>
          {currentBrandTitle && (
            <div className="vatech">
              <span>{currentBrandTitle}</span>
            </div>
          )}
        </div>
        <div
          className={`pdfCatalogCardInfo ${isExpanded ? "expanded" : "collapsed"}`}
        >
          <div className="pdfCatalogCardInfoContent">
            <h3>{member?.title}</h3>
            <div
              ref={paragraphRef}
              className={`pdfCatalogCardInfoParagraph ${isExpanded ? "expanded" : "collapsed"}`}
              dangerouslySetInnerHTML={{ __html: member?.short_text || "" }}
            />
            <div
              ref={measureRef}
              className="pdfCatalogMeasure"
              aria-hidden="true"
            />
            {isTruncated && (
              <button
                type="button"
                className="pdfCatalogShowMore"
                onClick={() => toggleExpand(member.id)}
                aria-expanded={isExpanded}
              >
                {isExpanded
                  ? t?.showLess || "gizlət"
                  : t?.showMorePdf || "..daha ətraflı"}
              </button>
            )}
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
};

const BrandsDetailPage = ({
  t,
  brandsDetailDataDetail,
  otherBrands,
  whatsappNumber,
}) => {
  const [productData, setProductData] = useState([]);
  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: response } = await axiosInstance.get(
          `/page-data/product?per_page=9999`,
        );
        setProductData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const videoUrl = brandsDetailDataDetail.video_1_url;
  const videoCover = brandsDetailDataDetail.video_1_cover;
  const videoTitle = brandsDetailDataDetail.video_1_title;
  const currentBrandTitle = brandsDetailDataDetail.title;
  const [firstCategory] = brandsDetailDataDetail.category || [];
  const categoryTitle = firstCategory?.title;
  const firstCountry = Array.isArray(brandsDetailDataDetail.country)
    ? brandsDetailDataDetail.country[0]
    : null;
  const countryTitle = firstCountry?.title;

  const filteredProducts = productData.filter((product) => {
    return (
      product.brands &&
      product.brands.length > 0 &&
      product.brands[0].title === currentBrandTitle
    );
  });

  return (
    <div id="brandsDetailPage">
      <div className="container">
        {/* Hero və digər bölmələr dəyişməz qalır */}
        <div className="brandsDetaiLPageHero">
          <div className="brandsDetaiLPageHeroImg">
            <Image
              src={`https://admin.adentta.az/storage${brandsDetailDataDetail.image}`}
              alt="brandsDetail"
              width={1400}
              height={800}
            />
            <div className="brandsDetaiLPageHeroContent">
              {countryTitle && (
                <div>
                  <span>{countryTitle}</span>
                </div>
              )}
              {categoryTitle && (
                <div>
                  <span>{categoryTitle}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE */}

        <div className="brandsDetaiLPageHeroMobile">
          <div className="brandsDetaiLPageHeroImgMobile">
            <Image
              src={`https://admin.adentta.az/storage${brandsDetailDataDetail.mobil_banner}`}
              alt="brandsDetail"
              width={1400}
              height={800}
            />
            <div className="brandsDetaiLPageHeroContentMobile">
              {countryTitle && (
                <div>
                  <span>{countryTitle}</span>
                </div>
              )}
              {categoryTitle && (
                <div>
                  <span>{categoryTitle}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="brandsDPTop ">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>
          <Image
            className="topper"
            src="/icons/rightDown.svg"
            alt="Adentta"
            width={8}
            height={8}
          />
          <Link href="/brands">
            <span className="topper">{t?.brands || "Brands"}</span>
          </Link>
          <Image
            className="topper"
            src="/icons/rightDown.svg"
            alt="Adentta"
            width={8}
            height={8}
          />
          <span className="topper lastLink">
            {brandsDetailDataDetail.title}
          </span>
        </div>
        <section id="brandsDPAbout">
          <div className="row">
            <div className="xl-5 lg-5 md-4 sm-12">
              <div className="detailPageBrandImgBorder">
                <div className="detailPageBrandImg">
                  <Image
                    src={`https://admin.adentta.az/storage${brandsDetailDataDetail.logo}`}
                    alt="Brand logo"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </div>
            <div className="xl-7 lg-7 md-8 sm-12">
              <div className="brandsDPAboutText">
                <h1>{brandsDetailDataDetail.title || "About brand"}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: brandsDetailDataDetail.about_brand,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Digər bölmələr (products, slider, certificates, blogs, video, other brands) dəyişməz qalır */}
      {brandsDetailDataDetail &&
        Array.isArray(brandsDetailDataDetail.product) &&
        brandsDetailDataDetail.product.length > 0 && (
          <section id="brandDPProducts">
            <div className="container">
              <div className="brandDPProductsCards">
                <div className="brandDPProductsHeadText">
                  <span>{t?.brandsPageBrandProducts || "Brand products"}</span>
                  <p>{t?.brandsPageBrandProductsAll || "Brand products"}</p>
                </div>
                <div className="row">
                  {brandsDetailDataDetail.product
                    .slice(0, 4)
                    .map((product, index) => (
                      <div key={index} className="xl-3 lg-3 md-6 sm-6">
                        <ProductCardFast
                          whatsappNumber={whatsappNumber}
                          id={product.id}
                          title={product.title}
                          image={
                            product?.image
                              ? `https://admin.adentta.az/storage${product.image}`
                              : "/images/adenttaDefaultImg.svg"
                          }
                          price={product.price}
                          oldPrice={product.old_price}
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
              </div>
            </div>
          </section>
        )}

      {/* PDF bölməsi – tam eyni məntiq tətbiq olunub */}
      {brandsDetailDataDetail.pdf?.length > 0 && (
        <section id="brandsDPCatalog">
          <div className="container">
            <div className="brandsDPCatalogHeadText">
              <span>{t?.brandsPagePDFTitle || "PDF Brands"}</span>
            </div>
            <div className="brandsDPCatalogCards">
              <div className="row">
                {brandsDetailDataDetail.pdf.slice(0, 4).map((pdf) => (
                  <PdfCatalogCard
                    key={pdf.id}
                    member={pdf}
                    t={t}
                    isExpanded={expandedIds.has(pdf.id)}
                    toggleExpand={toggleExpand}
                    currentBrandTitle={currentBrandTitle}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Qalan bölmələr dəyişməz */}
      {brandsDetailDataDetail.image_gallery?.length > 0 && (
        <section id="brandsDPSlider">
          <div className="brandsDPSliderHeadText">
            <span>{t?.eventsPagePhoto || "Photo gallery"}</span>
            <p>
              <div
                dangerouslySetInnerHTML={{
                  __html: brandsDetailDataDetail.galley_section_text,
                }}
              ></div>
            </p>
          </div>
          <BrandsDetailPageSlider
            brandsDetailDataDetail={brandsDetailDataDetail}
          />
        </section>
      )}

      {brandsDetailDataDetail.certificates?.length > 0 && (
        <section id="brandsDPCertificates">
          <div className="container">
            <div className="brandsDPCertificatesHeadText">
              <span>{t?.doctorsPageCertificates || "Certificates"}</span>
            </div>
            <div className="brandsDPCertificatesCards">
              <div className="row">
                {brandsDetailDataDetail.certificates
                  .slice(0, 4)
                  .map((certificate, index) => (
                    <div key={index} className="xl-3 lg-3 md-6 sm-6">
                      <Link
                        href={`https://admin.adentta.az/storage${certificate}`}
                        className="block brandsDPCertificatesImg"
                        data-fancybox="certificates-gallery"
                      >
                        <div className="brandDPCertificatesGaleryImg">
                          <Image
                            src={`https://admin.adentta.az/storage${certificate}`}
                            alt={`Certificate ${index + 1}`}
                            width={300}
                            height={300}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {brandsDetailDataDetail.blogs?.length > 0 && (
        <section id="brandsDPBlogCards">
          <div className="container">
            <div className="brandsDPBlogCardHeadText">
              <span>{t?.brandsPageBlogBrands || "Blog Brands"}</span>
            </div>
            <div className="brandsDPBlogCards">
              <div className="row">
                {brandsDetailDataDetail.blogs.slice(0, 4).map((blog, index) => (
                  <div key={index} className="xl-3 lg-4 md-6 sm-12">
                    <div className="ourBlog">
                      <Link
                        href={`/blogs/${(blog?.slug || blog?.title)
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")}-${blog.id}`}
                      >
                        <div className="blogCard">
                          <div className="blogCardImage">
                            <Image
                              src={`https://admin.adentta.az/storage${blog.image}`}
                              alt="blog"
                              width={400}
                              height={400}
                            />
                          </div>
                          <div className="blogCardContent">
                            <span>{blog.title}</span>
                            <div
                              className="brandBlogContent"
                              dangerouslySetInnerHTML={{ __html: blog.content }}
                            ></div>
                          </div>
                          <div className="blogCartLine"></div>
                          <div className="blogCardBottom">
                            <span>{t?.learnMore || "Learn More"}</span>
                            <img src="/icons/arrowTopRight.svg" alt="" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {videoUrl && videoCover && (
        <section id="brandsDPBVideoProvider">
          <div className="container">
            <div className="brandsDPVideoProviderHeadText">
              <span>{t?.brandsPageProductVideo || "Video Product"}</span>
            </div>
            <div className="brandsDPVideo">
              <div className="aboutPageParallax">
                <Link className="block" href={videoUrl} data-fancybox="videos">
                  <Image
                    src={`https://admin.adentta.az/storage${videoCover}`}
                    alt="###"
                    width={900}
                    height={400}
                  />
                  <div className="aboutPageParallaxText">
                    <span>VIDEO</span>
                    <p>{videoTitle}</p>
                    <div className="parallaxPlayIcon">
                      <Image
                        src="/icons/videoPlayIcon.svg"
                        alt="play"
                        width={28}
                        height={28}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {otherBrands.length > 0 && (
        <section id="brandsDPOtherBrand">
          <div className="container">
            <div className="brandsDPOtherBrandHeadText">
              <span>{t?.otherBrands || "Other Brands"}</span>
            </div>
            <div className="brandsDPOtherBrandCards">
              <div className="row">
                {otherBrands.slice(0, 4).map((brand) => (
                  <div key={brand.id} className="xl-3 lg-4 md-6 sm-12">
                    <Link
                      href={`/brands/${brand?.title
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}-${brand.id}`}
                      className="block"
                    >
                      <div className="topBrand">
                        <div className="topBrandImg">
                          <div className="topBrandLittleImg">
                            {brand.logo && (
                              <Image
                                src={`https://admin.adentta.az/storage${brand.logo}`}
                                alt={brand.title}
                                width={400}
                                height={400}
                              />
                            )}
                          </div>
                        </div>
                        <span className="topBrandSpan">{brand.title}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BrandsDetailPage;
