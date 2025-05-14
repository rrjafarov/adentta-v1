// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper/modules";
// import Image from "next/image";
// import ChangeYearDot from "../../public/icons/ellipses.svg.svg";

// export default  function VerticalCenteredSlider ({title, content}) {

//   const data = [
//     {
//       year: "2025",
//       // header: "History of 2025",
//       header: title,
//       text: content,
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2024",
//       header: "History of 2024",
//       text: "Lorem ipsum 2024.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2023",
//       header: "History of 2023",
//       text: "Lorem ipsum 2023.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2022",
//       header: "History of 2022",
//       text: "Lorem ipsum 2022.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2021",
//       header: "History of 2021",
//       text: "Lorem ipsum 2021.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2020",
//       header: "History of 2020",
//       text: "Lorem ipsum 2020.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2019",
//       header: "History of 2019",
//       text: "Lorem ipsum 2019.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2018",
//       header: "History of 2018",
//       text: "Lorem ipsum 2018.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2017",
//       header: "History of 2017",
//       text: "Lorem ipsum 2017.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2016",
//       header: "History of 2016",
//       text: "Lorem ipsum 2016.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2015",
//       header: "History of 2015",
//       text: "Lorem ipsum 2015.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2014",
//       header: "History of 2014",
//       text: "Lorem ipsum 2014.",
//       image: "/images/changeYearIMG1.png",
//     },
//     {
//       year: "2013",
//       header: "History of 2013",
//       text: "Lorem ipsum 2013.",
//       image: "/images/changeYearIMG1.png",
//     },
//   ];

//   const [activeIndex, setActiveIndex] = useState(2);
//   const swiperRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     // İlk kontrol
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <section id="changeYearFolder">
//       <div className="container">
//         <div className="verticalSliderHeaderText">
//           <h4>About Us</h4>
//           <p>Overview of the company's history</p>
//         </div>
//         <div className="vertical-slider-container">
//           {/* Slider Kısmı */}
//           <div className="vertical-slider-left">
//             <div className="vertical-slider-wrapper">
//               <Swiper
//                 ref={swiperRef}
//                 direction={isMobile ? "horizontal" : "vertical"}
//                 slidesPerView={isMobile ? 5 : 7}
//                 centeredSlides={true}
//                 loop={true}
//                 loopAdditionalSlides={5}
//                 spaceBetween={10}
//                 onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//                 slideToClickedSlide={true}
//                 className="vertical-swiper"
//               >
//                 {data.map((item, idx) => (
//                   <SwiperSlide key={idx}>
//                     <div
//                       className={`vertical-slide ${idx === activeIndex ? "active" : ""}`}
//                     >
//                       {/* Mobilde ellipse göstermiyoruz */}
//                       {!isMobile && idx === activeIndex && (
//                         <span className="active-plus">
//                           <ChangeYearDot />
//                         </span>
//                       )}
//                       {item.year}
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           </div>

//           {/* İçerik + Resim Kısmı */}
//           <div className="vertical-slider-right">
//             <div className="vertical-content">
//               <span>{data[activeIndex].header}</span>
//               <p>{data[activeIndex].text}</p>
//             </div>
//             <img
//               src={data[activeIndex].image}
//               alt={data[activeIndex].year}
//               className="vertical-image"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// apiiiiiiiiiii

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper/modules";
// import ChangeYearDot from "../../public/icons/ellipses.svg.svg";

// export default function VerticalCenteredSlider({aboutYears}) {
//   // const [data, setData] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   // Ekran boyutuna göre mobil kontrolü
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     try {
//   //       const response = await axios.get(
//   //         "https://api-addenta.onestudio.az/api/v1/page-data/history"
//   //       );
//   //       // API yanıtındaki veri, response.data.data.data dizisi içinde yer alıyor.
//   //       setData(response.data.data.data);
//   //     } catch (error) {
//   //       console.error("Veri çekilirken hata oluştu:", error);
//   //     }
//   //   }
//   //   fetchData();
//   // }, []);

//   // if (!data.length) {
//   //   return <p>Loading...</p>;
//   // }

//   return (
//     <section id="changeYearFolder">
//       <div className="container">
//         <div className="verticalSliderHeaderText">
//           <h4>About Us</h4>
//           <p>Overview of the company's history</p>
//         </div>
//         <div className="vertical-slider-container">
//           {/* Slider Sol Kısım */}
//           <div className="vertical-slider-left">
//             <div className="vertical-slider-wrapper">
//               <Swiper
//                 ref={swiperRef}
//                 direction={isMobile ? "horizontal" : "vertical"}
//                 slidesPerView={isMobile ? 5 : 7}
//                 centeredSlides={true}
//                 loop={true}
//                 loopAdditionalSlides={5}
//                 spaceBetween={10}
//                 onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//                 slideToClickedSlide={true}
//                 className="vertical-swiper"
//               >
//                 {aboutYears.map((item, idx) => (
//                   <SwiperSlide key={item.id}>
//                     <div className={`vertical-slide ${idx === activeIndex ? "active" : ""}`}>
//                       {/* Mobilde ellipse göstermiyoruz */}
//                       {!isMobile && idx === activeIndex && (
//                         <span className="active-plus">
//                           <ChangeYearDot />
//                         </span>
//                       )}
//                       {item.title}
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>
//           </div>

//           {/* İçerik ve Resim Kısmı */}
//           <div className="vertical-slider-right">
//             <div className="vertical-content">
//               <span>{data[activeIndex].title}</span>
//               <p
//                 dangerouslySetInnerHTML={{ __html: data[activeIndex].content }}
//               ></p>
//             </div>
//             <img
//               src={data[activeIndex].image}
//               alt={data[activeIndex].title}
//               className="vertical-image"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

//

"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

export default function VerticalCenteredSlider({ historyYears, t }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="changeYearFolder">
      <div className="container">
        <div className="verticalSliderHeaderText">
          <h4 className="topper">{t?.aboutBannerTitle || "About"}</h4>
          <p>{t?.changeYearContent || "Overview of the company's history"}</p>
        </div>
        <div className="vertical-slider-container">
          {/* Slider Sol Kısım */}
          <div className="vertical-slider-left">
            <div className="vertical-slider-wrapper">
              <Swiper
                direction={isMobile ? "horizontal" : "vertical"}
                slidesPerView={isMobile ? 5 : 7}
                centeredSlides={true}
                loop={true}
                spaceBetween={10}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                slideToClickedSlide={true}
                className="vertical-swiper"
              >
                {historyYears.map((item, idx) => (
                  <SwiperSlide key={item.id}>
                    <div
                      className={`vertical-slide ${
                        idx === activeIndex ? "active" : ""
                      }`}
                    >
                      {!isMobile && idx === activeIndex && (
                        <span className="active-plus">
                          <img src="/icons/ellipses.svg.svg" alt="Ellipse" />
                          {/* <ChangeYearDot /> */}
                        </span>
                      )}
                      {item.history}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* İçerik ve Resim Kısmı */}
          <div className="vertical-slider-right">
            <div className="vertical-content">
              <span>{historyYears[activeIndex]?.title}</span>
              <p
                dangerouslySetInnerHTML={{
                  __html: historyYears[activeIndex]?.content,
                }}
              ></p>
            </div>
            
            {historyYears[activeIndex]?.image && (
              <Image
                src={`https://admin.adentta.az/storage${historyYears[activeIndex].image}`}
                alt={historyYears[activeIndex]?.title || "banner"}
                width={600} 
                height={600} 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
