"use client";
import React from "react";
import LoadMoreBTN from "./LoadMoreBTN";
import Link from "next/link";
import AboutUsBTN from "./AboutUsBTN";
import Image from "next/image";
import CountUp from "react-countup";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: {
    zoom: false,
  },
});

const VideoProviderHomePage = ({ homepageData, t }) => {
  return (
    <section id="vidProviderHomePage">
      <div className="container vidProviderHomePage">
        {/* <div className="row"> */}
        {/* <div className="xl-6 lg-6 md-6 sm-12"> */}
        <div className="vidProviderContent">
          <div className="vidProviderContentText">
            <span>{t?.whatWeProvide || "What We Provide"}</span>
            <p>
              {t?.whatWeProvideContent ||
                "Empowering Smiles, Elevating Care – Your Trusted Dental Supply Partner."}
            </p>
            <p>
              {t?.whatWeProvideContent2 ||
                "Our practice is designed not only to provide cutting-edge treatments but also to create an environment where patients feel relaxed and confident in their care."}
            </p>
          </div>

          <div className="vidProviderContentChecked">
            <div className="checked">
              <div className="checkIcon">
                <img src="/icons/check.svg" alt="check" />
              </div>
              <span>{t?.aboutCheck1 || "/"}</span>
            </div>
            <div className="checked">
              <div className="checkIcon">
                <img src="/icons/check.svg" alt="check" />
              </div>
              <span>{t?.aboutCheck2 || "/"}</span>
            </div>
            <div className="checked">
              <div className="checkIcon">
                <img src="/icons/check.svg" alt="check" />
              </div>
              <span>{t?.aboutCheck3 || "/"}</span>
            </div>
            <div className="checked">
              <div className="checkIcon">
                <img src="/icons/check.svg" alt="check" />
              </div>
              <span>{t?.aboutCheck4 || "/"}</span>
            </div>
          </div>
          <Link href={"/about"}>
            <AboutUsBTN t={t} />
          </Link>
        </div>
        {/* </div> */}

        {/* <div className="xl-6 lg-6 md-6 sm-12"> */}
        <div className="vidProviderVideo">
          <Link href={homepageData.video_url} data-fancybox="videos">
            <div className="vidProviderVideoContent">
              <Image
                src={`https://admin.adentta.az/storage${homepageData.video_cover}`}
                alt={homepageData.meta_title || "video"}
                width={500}
                height={500}
              />
              
              {/* <img
                src={`https://admin.adentta.az/storage${homepageData.video_cover}`}
                alt="video"
              /> */}
              <div className="happyCustomer">
                <div className="smallHappyCustomer">
                  <span>
                    <CountUp
                      end={homepageData.customer_count}
                      suffix="+"
                      duration={4}
                      className="stats-number"
                    />
                  </span>
                  <p>{homepageData.customer_text}</p>
                </div>
              </div>
              <div className="videoHomePagePlayIcon">
                <Image
                  src="/icons/videoPlay.svg"
                  alt="play"
                  width={5}
                  height={5}
                />
              </div>
            </div>
          </Link>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default VideoProviderHomePage;

// "use client";
// import React from "react";
// import LoadMoreBTN from "./LoadMoreBTN";
// import Link from "next/link";
// import AboutUsBTN from "./AboutUsBTN";
// import Image from "next/image";
// import CountUp from "react-countup";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Fancybox.bind("[data-fancybox]", {
//   dragToClose: false,
//   Image: {
//     zoom: false,
//   },
// });

// function getYoutubeId(url) {
//   try {
//     const u = new URL(url);
//     return u.searchParams.get("v");
//   } catch {
//     const m = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
//     return m ? m[1] : null;
//   }
// }

// const VideoProviderHomePage = ({ homepageData, t }) => {
//   const videoId = getYoutubeId(homepageData.video_url);
//   const iframeSrc = videoId
//     ? `https://www.youtube.com/embed/${videoId}?start=0&end=4&autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`
//     : null;

//   return (
//     <section id="vidProviderHomePage" style={{ overflow: "hidden" }}>
//       <div className="container vidProviderHomePage">
//         <div className="vidProviderContent">
//           {/* ... other content unchanged ... */}
//         </div>

//         <div
//           className="vidProviderVideo"
//           style={{
//             position: "relative",
//             width: "100%",
//             height: "0",
//             paddingBottom: "56.25%", // 16:9 aspect ratio
//             overflow: "hidden",
//           }}
//         >
//           <Link href={homepageData.video_url} data-fancybox="videos">
//             <div
//               className="vidProviderVideoContent"
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//               }}
//             >
//               {iframeSrc && (
//                 <iframe
//                   src={iframeSrc}
//                   frameBorder="0"
//                   allow="autoplay; encrypted-media"
//                   allowFullScreen
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     pointerEvents: "none",
//                   }}
//                 />
//               )}
//               <div
//                 className="happyCustomer"
//                 style={{
//                   position: "absolute",
//                   bottom: "1rem",
//                   left: "1rem",
//                 }}
//               >
//                 <div className="smallHappyCustomer">
//                   <span>
//                     <CountUp
//                       end={homepageData.customer_count}
//                       suffix="+"
//                       duration={4}
//                       className="stats-number"
//                     />
//                   </span>
//                   <p>{homepageData.customer_text}</p>
//                 </div>
//               </div>
//               <div
//                 className="videoHomePagePlayIcon"
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                 }}
//               >
//                 <Image
//                   src="/icons/videoPlay.svg"
//                   alt="play"
//                   width={40}
//                   height={40}
//                 />
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VideoProviderHomePage;
