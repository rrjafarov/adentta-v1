// // ! SON VERSIYA
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import BrandsDetailPageSlider from "@/components/Sliders/BrandsDetailPageSlider";
// import BrandsDetailPageVideo from "@/components/BrandsDetailPageVideo";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
// import ContactVideo from "./ContactVideo";
// import Manat from "../../public/icons/manat.svg";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// // Məhsul datalarını API-dən çəkən funksiya
// async function fetchAboutPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: product } = await axiosInstance.get(`/page-data/product`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return product.data.data;
//   } catch (error) {
//     console.error("Failed to fetch product page data", error);
//     throw error;
//   }
// }

// // Fancybox konfiqurasiya
// Fancybox.bind("[data-fancybox]", {
//   dragToClose: false,
//   Image: {
//     zoom: false,
//   },
// });

// const BrandsDetailPage = async ({ brandsDetailDataDetail, otherBrands }) => {
//   // Cari brendin title dəyəri (məsələn: "Straumann")
//   const currentBrandTitle = brandsDetailDataDetail.title;
//   // Kategoriya və ölkə məlumatları
//   const [firstCategory] = brandsDetailDataDetail.category || [];
//   const categoryTitle = firstCategory
//     ? firstCategory.title
//     : "Kategoriya yoxdur";
//   const [firstCountry] = brandsDetailDataDetail.country || [];
//   const countryTitle = firstCountry ? firstCountry.title : "Ölkə yoxdur";

//   // Məhsul datasını əldə edirik
//   const productData = await fetchAboutPageData();

//   // Filterlənmiş məhsullar:
//   // Hər məhsul obyektində brands varsa və brands massivinin ilk elementinin title dəyəri cari brend title ilə eynidirsə...
//   const filteredProducts = productData.filter((product) => {
//     return (
//       product.brands &&
//       product.brands.length > 0 &&
//       product.brands[0].title === currentBrandTitle
//     );
//   });

//   return (
//     <div id="brandsDetailPage">
//       <div className="container">
//         <div className="brandsDetaiLPageHero">
//           <div className="brandsDetaiLPageHeroImg">
//             <Image
//               src={`https://admin.adentta.az/storage${brandsDetailDataDetail.image}`}
//               alt="brandsDetail"
//               width={800}
//               height={400}
//             />
//             <div className="brandsDetaiLPageHeroContent">
//               <div>
//                 <span>{countryTitle}</span>
//               </div>
//               <div>
//                 <span>{categoryTitle}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="brandsDPTop ">
//           <h1 className="topper">Adentta</h1>
//           <Image
//             className="topper"
//             src="/icons/rightDown.svg"
//             alt="Adentta"
//             width={8}
//             height={8}
//           />
//           <h4 className="topper">Brands</h4>
//         </div>

//         <section id="brandsDPAbout">
//           <div className="row">
//             <div className="xl-5 lg-5 md-4 sm-12">
//               <div className="detailPageBrandImgBorder">
//                 <div className="detailPageBrandImg">
//                   <Image
//                     src={`https://admin.adentta.az/storage${brandsDetailDataDetail.logo}`}
//                     alt="Brand logo"
//                     width={300}
//                     height={300}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="xl-7 lg-7 md-8 sm-12">
//               <div className="brandsDPAboutText">
//                 <span>About brand</span>
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: brandsDetailDataDetail.about_brand,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Brand products bölməsi */}
//       <section id="brandDPProducts">
//         <div className="container">
//           <div className="brandDPProductsCards">
//             <div className="brandDPProductsHeadText">
//               <span>Brand products</span>
//               <p>All products for this brand</p>
//             </div>
//             <div className="row">
//               {filteredProducts.length ? (
//                 filteredProducts.slice(0, 4).map((product, index) => (
//                   <div key={index} className="xl-3 lg-3 md-6 sm-6">
//                     <Link
//                       href={`/products/${product.title
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}-${product.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent ">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={`https://admin.adentta.az/storage${product.image}`}
//                               alt={product.title}
//                             />
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentInner">
//                           <div className="homePageProductCardContentText ">
//                             <span>{product.title}</span>
//                           </div>
//                           <div className="price">
//                             <div className="priceItem">
//                               <strong id="prices">{product.price}</strong>
//                               <Manat />
//                             </div>
//                           </div>
//                         </div>

//                         <div className="homePageProductCardContentBottom">
//                           <span>Learn More</span>
//                           <img
//                             src="/icons/arrowTopRight.svg"
//                             alt="Learn more"
//                           />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))
//               ) : (
//                 <p>No products found for this brand.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="brandsDPSlider">
//         <div className="brandsDPSliderHeadText">
//           <span>Photo Gallery</span>
//           <p>
//             Frame is a long established fact that a reader will be distracted by
//             the readable content of a page when looking at its layout. The point
//             of usinFrame is a long established fact that a reader will be
//             distracted by the readabFrame is a long established fact that a
//             reader will be distracted by the readable content of a page when
//             looking at its layout.
//           </p>
//         </div>
//         <BrandsDetailPageSlider
//           brandsDetailDataDetail={brandsDetailDataDetail}
//         />
//       </section>

//       <section id="brandsDPCatalog">
//         <div className="container">
//           <div className="brandsDPCatalogHeadText">
//             <span>PDF Catalog</span>
//           </div>
//           <div className="brandsDPCatalogCards">
//             <div className="row">
//               {brandsDetailDataDetail.pdf &&
//               brandsDetailDataDetail.pdf.length > 0 ? (
//                 brandsDetailDataDetail.pdf.slice(0, 4).map((pdf, index) => (
//                   <div key={index} className="xl-4 lg-4 md-6 sm-12">
//                     <div className="pdfCatalogCard">
//                       <div className="pdfCatalogCardImg">
//                         <Image
//                           src={`https://admin.adentta.az/storage${pdf.image}`}
//                           alt={pdf.title}
//                           width={300}
//                           height={300}
//                         />
//                         <div className="vatech">
//                           <span>{brandsDetailDataDetail.title}</span>
//                         </div>
//                       </div>
//                       <div className="pdfCatalogCardInfo">
//                         <div className="pdfCatalogCardInfoContent">
//                           <span>{pdf.title}</span>
//                           {pdf.short_text && <p>{pdf.short_text}</p>}
//                           <a
//                             href={`https://admin.adentta.az/storage/uploads/pdf/${pdf.id}.pdf`}
//                             download
//                           >
//                             <button>
//                               Download PDF
//                               <Image
//                                 src="/icons/downloadIcon.svg"
//                                 alt="download"
//                                 width={20}
//                                 height={20}
//                               />
//                             </button>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No PDF catalogs available for this brand.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="brandsDPCertificates">
//         <div className="container">
//           <div className="brandsDPCertificatesHeadText">
//             <span>Certificates</span>
//           </div>
//           <div className="brandsDPCertificatesCards">
//             <div className="row">
//               {brandsDetailDataDetail.certificates
//                 ?.slice(0, 4)
//                 .map((certificate, index) => (
//                   <div key={index} className="xl-3 lg-3 md-6 sm-6">
//                     <Link
//                       href={`https://admin.adentta.az/storage${certificate}`}
//                       className="block brandsDPCertificatesImg"
//                       data-fancybox="certificates-gallery"
//                     >
//                       <div className="brandDPCertificatesGaleryImg">
//                         <Image
//                           src={`https://admin.adentta.az/storage${certificate}`}
//                           alt={`Certificate ${index + 1}`}
//                           width={300}
//                           height={300}
//                         />
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="brandsDPBlogCards">
//         <div className="container">
//           <div className="brandsDPBlogCardHeadText">
//             <span>Blogs related of brand</span>
//           </div>
//           <div className="brandsDPBlogCards">
//             <div className="row">
//               {brandsDetailDataDetail.blogs?.slice(0, 4).map((blog, index) => (
//                 <div key={index} className="xl-3 lg-4 md-6 sm-12">
//                   <div className="ourBlog">
//                     <Link href="/blogs/id">
//                       <div className="blogCard">
//                         <div className="blogCardImage">
//                           <Image
//                             src={`https://admin.adentta.az/storage${blog.image}`}
//                             alt="blog"
//                             width={400}
//                             height={400}
//                           />
//                           <div className="blogCardImageDate">
//                             <span className="blogCardDate">
//                               January 28, 2025
//                             </span>
//                           </div>
//                         </div>

//                         <div className="blogCardContent">
//                           <span>{blog.title}</span>
//                           <div
//                             dangerouslySetInnerHTML={{ __html: blog.content }}
//                           ></div>
//                         </div>
//                         <div className="blogCartLine"></div>
//                         <div className="blogCardBottom">
//                           <span>Learn More</span>
//                           <img src="/icons/arrowTopRight.svg" alt="" />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="brandsDPBVideoProvider">
//         <div className="container">
//           <div className="brandsDPVideoProviderHeadText">
//             <span>Product video</span>
//           </div>
//           <div className="brandsDPVideo">
//             <div className="aboutPageParallax">
//               <Image
//                 src="/images/parallaxImg.png"
//                 alt="###"
//                 width={900}
//                 height={400}
//               />
//               <div className="aboutPageParallaxText">
//                 <span>VIDEO</span>
//                 <p>Advanced Equipments for Better Care</p>
//                 <div className="parallaxPlayIcon">
//                   <Image
//                     src="/icons/videoPlayIcon.svg"
//                     alt="play"
//                     width={28}
//                     height={28}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="brandsDPOtherBrand">
//         <div className="container">
//           <div className="brandsDPOtherBrandHeadText">
//             <span>Other Brand</span>
//           </div>
//           <div className="brandsDPOtherBrandCards">
//             <div className="row">
//               {otherBrands.map((brand) => (
//                 <div key={brand.id} className="xl-3 lg-4 md-6 sm-12">
//                   <Link
//                     href={`/brands/${brand.title
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}-${brand.id}`}
//                     className="block"
//                   >
//                     <div className="topBrand">
//                       <div className="topBrandImg">
//                         <div className="topBrandLittleImg">
//                           {brand.logo && (
//                             <Image
//                               src={`https://admin.adentta.az/storage${brand.logo}`}
//                               alt={brand.title}
//                               width={400}
//                               height={400}
//                             />
//                           )}
//                         </div>
//                       </div>
//                       <span className="topBrandSpan">{brand.title}</span>
//                     </div>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BrandsDetailPage;
// // ! SON VERSIYA

// !
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BrandsDetailPageSlider from "@/components/Sliders/BrandsDetailPageSlider";
import BrandsDetailPageVideo from "@/components/BrandsDetailPageVideo";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import ContactVideo from "./ContactVideo";
import Manat from "../../public/icons/manat.svg";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

// Məhsul datalarını API-dən çəkən funksiya
async function fetchAboutPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: product } = await axiosInstance.get(`/page-data/product`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return product.data.data;
  } catch (error) {
    console.error("Failed to fetch product page data", error);
    throw error;
  }
}
// Fancybox konfiqurasiya
Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: {
    zoom: false,
  },
});
const BrandsDetailPage = async ({ t, brandsDetailDataDetail, otherBrands }) => {
  const videoUrl = brandsDetailDataDetail.video_1_url;
  const videoCover = brandsDetailDataDetail.video_1_cover;
  const videoTitle = brandsDetailDataDetail.video_1_title;

  const currentBrandTitle = brandsDetailDataDetail.title;
  const [firstCategory] = brandsDetailDataDetail.category || [];

  const categoryTitle = firstCategory?.title;
  const [firstCountry] = brandsDetailDataDetail.country || [];
  const countryTitle = firstCountry?.title;

  const productData = await fetchAboutPageData();

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
        {/* Hero */}
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

        {/* Top breadcrumb */}
        <div className="brandsDPTop ">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <Image
            className="topper"
            src="/icons/rightDown.svg"
            alt="Adentta"
            width={8}
            height={8}
          />
          <Link href="/brands">
            <h4 className="topper">{t?.brands || "Brands"}</h4>
          </Link>
          <Image
            className="topper"
            src="/icons/rightDown.svg"
            alt="Adentta"
            width={8}
            height={8}
          />
          <h4 className="topper">{brandsDetailDataDetail.title}</h4>
        </div>

        {/* About brand */}
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
                <span>{t?.brandsPageAboutBrands || "About brand"}</span>
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

      {filteredProducts.length > 0 && (
        <section id="brandDPProducts">
          <div className="container">
            <div className="brandDPProductsCards">
              <div className="brandDPProductsHeadText">
                <span>{t?.brandsPageBrandProducts || "Brand products"}</span>
                <p>{t?.brandsPageBrandProductsAll || "Brand products"}</p>
              </div>
              <div className="row">
                {filteredProducts.slice(0, 4).map((product, index) => (
                  <div key={index} className="xl-3 lg-3 md-6 sm-6">
                    <Link
                      href={`/products/${product?.title
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}-${product.id}`}
                      className="block"
                    >
                      <div className="homePageProductCardContent ">
                        <div className="homePageProCardImgs">
                          <div className="homePageProductCardContentImage">
                            <img
                              src={`https://admin.adentta.az/storage${product.image}`}
                              alt={product.title}
                            />
                          </div>
                        </div>
                        <div className="homePageProductCardContentInner">
                          <div className="homePageProductCardContentText ">
                            <span>{product.title}</span>
                          </div>
                          <div className="price">
                            <div className="priceItem">
                              <strong id="prices">{product.price}</strong>
                              <Manat />
                            </div>
                          </div>
                        </div>
                        <div className="homePageProductCardContentBottom">
                          <span>{t?.learnMore || "Learn More"}</span>
                          <img
                            src="/icons/arrowTopRight.svg"
                            alt="Learn more"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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

      {brandsDetailDataDetail.pdf?.length > 0 && (
        <section id="brandsDPCatalog">
          <div className="container">
            <div className="brandsDPCatalogHeadText">
              <span>{t?.brandsPagePDFTitle || "PDF Brands"}</span>
            </div>
            <div className="brandsDPCatalogCards">
              <div className="row">
                {brandsDetailDataDetail.pdf.slice(0, 4).map((pdf, index) => (
                  <div key={index} className="xl-4 lg-4 md-6 sm-12">
                    <div className="pdfCatalogCard">
                      <div className="pdfCatalogCardImg">
                        <Image
                          src={`https://admin.adentta.az/storage${pdf.image}`}
                          alt={pdf.title}
                          width={400}
                          height={400}
                        />
                        <div className="vatech">
                          <span>{brandsDetailDataDetail.title}</span>
                        </div>
                      </div>
                      <div className="pdfCatalogCardInfo">
                        <div className="pdfCatalogCardInfoContent">
                          <span>{pdf.title}</span>
                          {pdf.short_text && <p>{pdf.short_text}</p>}
                          <a
                            href={`https://admin.adentta.az/storage/uploads/pdf/${pdf.id}.pdf`}
                            download
                          >
                            <button>
                              {t?.pdfPageDownload || "Download PDF"}
                              <Image
                                src="/icons/downloadIcon.svg"
                                alt="download"
                                width={20}
                                height={20}
                              />
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                        href={`/blogs/${blog?.title
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
                            {/* <div className="blogCardImageDate">
                              
                              {blog.published_date && (
                                <span className="blogCardDate">
                                  {blog.published_date}
                                </span>
                              )}
                            </div> */}

                            {/* ! */}
                            {/* {blog.published_date &&
                              !isNaN(Date.parse(blog.published_date)) && (
                                <div className="blogCardImageDate">
                                  <span className="blogCardDate">
                                    {formatDate(blog.published_date)}
                                  </span>
                                </div>
                              )} */}
                            {/* ! */}
                          </div>
                          <div className="blogCardContent">
                            <span>{blog.title}</span>
                            <div
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

      {/* Product video */}
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

      {/* Other Brand */}
      {otherBrands.length > 0 && (
        <section id="brandsDPOtherBrand">
          <div className="container">
            <div className="brandsDPOtherBrandHeadText">
              <span>{t?.otherBrands || "Other Brands"}</span>
            </div>
            <div className="brandsDPOtherBrandCards">
              <div className="row">
                {otherBrands.splice(0, 4).map((brand) => (
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
// !
