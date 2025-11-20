import React from "react";
import Image from "next/image";
import CountUp from "react-countup";

// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// async function fetchAboutPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: about } = await axiosInstance.get(`/page-data/about`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return about;
//   } catch (error) {
//     console.error("Failed to fetch about page data", error);
//     throw error;
//   }
// }

const AboutPageCountUp = ({
  statistica1,
  statistica2,
  statistica3,
  statistica4,
  statistica2Title,
  statistica3Title,
  statistica4Title,
  statistica1Img,
  statistica2Img,
  statistica3Img,
  statistica4Img,
  t
}) => {
  // const about = await fetchAboutPageData();
  // const aboutYears = about?.data?.data || [];
  // console.log(aboutYears, "kkdkk");

  return (
    <div className="container">
      <div className="countUPcards">
        <div className="row flex items-end secondRow">
          <div className="xl-6 lg-6 md-6 sm-12">
            <div className="row flex items-end">
              <div className="xl-6 lg-6 md-6 sm-6">
                <div className="countCard">
                  <span className="countUpFirstCardTxt">{t?.allEpuipment || "All equipment"}</span>
                  <CountUp
                    end={statistica1}
                    duration={3}
                    className="countNumber"
                  />
                  <Image
                    // src="/images/countUpInner1.png"
                    src={`https://admin.adentta.az/storage${statistica1Img}`}
                    alt="Medical Device"
                    width={100}
                    height={100}
                    className="countImage"
                  />
                </div>
              </div>

              <div className="xl-6 lg-6 md-6 sm-6">
                <div className="secondCountCard">
                  <div className="secondCountCardItem">
                    {/* <span className="www">Brands</span> */}
                    <span className="www">{statistica2Title}</span>
                    <CountUp
                      end={statistica2}
                      duration={3}
                      className="secondCountNumber"
                    />
                  </div>
                  <Image
                    // src="/images/countUpInner2.png"
                    src={`https://admin.adentta.az/storage${statistica2Img}`}
                    alt="Medical Device"
                    width={100}
                    height={100}
                    className="countImage countImage2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="xl-6 lg-6 md-6 sm-12">
            <div className="row flex items-end">
              <div className="xl-6 lg-6 md-6 sm-6">
                <div className="thirdCountCard">
                  <div className="thirdCountCartItem">
                    <span className="stats-title">{statistica3Title}</span>
                    <CountUp
                      end={statistica3}
                      duration={3}
                      suffix="%"
                      className="stats-number"
                    />
                    <span className="stats-text">{t?.productPerMouth || "154 products per mouth"}</span>
                  </div>
                  <Image
                    // src="/images/countUpInner3.png"
                    src={`https://admin.adentta.az/storage${statistica3Img}`}
                    alt="Medical Device"
                    width={100}
                    height={100}
                    className="countImage"
                  />
                </div>
              </div>

              <div className="xl-6 lg-6 md-6 sm-6">
                <div className="fourCountCard">
                  <div className="fourCountCartItem">
                    <span className="stats-title">{statistica4Title}</span>
                    <CountUp
                      end={statistica4}
                      duration={3}
                      prefix="+"
                      className="stats-number"
                    />
                  </div>
                  <Image
                    // src="/images/countUpInner4.png"
                    src={`https://admin.adentta.az/storage${statistica4Img}`}
                    alt="Medical Device"
                    width={100}
                    height={100}
                    className="countImage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageCountUp;
