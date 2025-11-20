
"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "../../app/[locale]/globals.scss";
import { Autoplay, Pagination } from "swiper/modules";
import { usePathname } from "next/navigation";

Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: { zoom: false },
});

const BlogDetailSlider = ({ t, eventsDetail }) => {
  const pathname = usePathname();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl = origin + pathname;

  const hasImages =
    Array.isArray(eventsDetail.image_gallery) &&
    eventsDetail.image_gallery.length > 0;
  const hasVideo = Boolean(eventsDetail.video_url);

  // Tab-lar üçün state, default şəkil
  const [showVideo, setShowVideo] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(currentUrl);
  };

  // Heç media yoxdursa
  if (!hasImages && !hasVideo) {
    return <SocialLinks currentUrl={currentUrl} onCopy={handleCopy} />;
  }

  // Həm şəkil, həm video varsa: tab-lı görünüş
  if (hasImages && hasVideo) {
    return (
      <>
        <div className="blogDetailSliderHeaderText">
          <span
            onClick={() => setShowVideo(false)}
            style={{ cursor: "pointer", opacity: showVideo ? 0.5 : 1 }}
          >
            {t?.eventsPagePhoto || "Photo Gallery"}
          </span>
          <p
            onClick={() => setShowVideo(true)}
            style={{ cursor: "pointer", opacity: showVideo ? 1 : 0.5 }}
          >
            {t?.eventsPageVideo || "Video"}
          </p>
        </div>

        {/* Şəkil slider */}
        {!showVideo && (
          <Swiper
            slidesPerView={1.8}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 1, spaceBetween: 20 },
              1024: { slidesPerView: 1.8, spaceBetween: 20 },
            }}
            speed={2000}
            loop="true"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            centeredSlides
            pagination={{
              clickable: true,
              el: ".blogDetail-custom-pagination",
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper blogSwiper"
          >
            {eventsDetail.image_gallery.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Link
                  href={`https://admin.adentta.az/storage${img}`}
                  className="blogSliderGalleryImg"
                  data-fancybox="gallery"
                >
                  <Image
                    src={`https://admin.adentta.az/storage${img}`}
                    className="blogSliderCardImg"
                    alt="gallery"
                    width={1000}
                    height={800}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Video slider */}
        {showVideo && (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            speed={2000}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            centeredSlides
            modules={[Autoplay, Pagination]}
            className="mySwiper blogSwiper"
          >
            <SwiperSlide>
              <Link
                href={eventsDetail.video_url}
                className="blogSliderGalleryImg emblem"
                data-fancybox="videos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`https://admin.adentta.az/storage${eventsDetail.video_cover}`}
                  className="blogSliderCardImgVideo"
                  alt="video cover"
                  width={1000}
                  height={800}
                />
                <div className="eventsPageAdressVideoText">
                  <div className="eventsPagePlayIcon">
                    <Image
                      src="/icons/videoPlayIcon.svg"
                      alt="play"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        )}

        <div className="blogDetail-custom-pagination" />
        <SocialLinks currentUrl={currentUrl} onCopy={handleCopy} />
      </>
    );
  }

  if (hasImages) {
    return (
      <>
        <div className="blogDetailSliderHeaderText">
          <span>
            {t?.eventsPagePhoto || "Photo Gallery"}
          </span>
        </div>
        <Swiper
          slidesPerView={1.8}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 1, spaceBetween: 20 },
            1024: { slidesPerView: 1.8, spaceBetween: 20 },
          }}
          speed={2000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          centeredSlides
          pagination={{ clickable: true, el: ".blogDetail-custom-pagination" }}
          modules={[Autoplay, Pagination]}
          className="mySwiper blogSwiper"
        >
          {eventsDetail.image_gallery.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Link
                href={`https://admin.adentta.az/storage${img}`}
                className="blogSliderGalleryImg"
                data-fancybox="gallery"
              >
                <Image
                  src={`https://admin.adentta.az/storage${img}`}
                  className="blogSliderCardImg"
                  alt="gallery"
                  width={1000}
                  height={800}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="blogDetail-custom-pagination" />
        <SocialLinks currentUrl={currentUrl} onCopy={handleCopy} />
      </>
    );
  }

  return (
    <>
      <div className="blogDetailSliderHeaderText">
        <p style={{ fontWeight: "bold" }}>{t?.eventsPageVideo || "Video"}</p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        speed={2000}
        loop="true"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        centeredSlides
        modules={[Autoplay, Pagination]}
        className="mySwiper blogSwiper"
      >
        <SwiperSlide>
          <Link
            href={eventsDetail.video_url}
            className="blogSliderGalleryImg emblem"
            data-fancybox="videos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`https://admin.adentta.az/storage${eventsDetail.video_cover}`}
              className="blogSliderCardImgVideo"
              alt="video cover"
              width={1000}
              height={800}
            />
            <div className="eventsPageAdressVideoText">
              <div className="eventsPagePlayIcon">
                <Image
                  src="/icons/videoPlayIcon.svg"
                  alt="play"
                  width={28}
                  height={28}
                />
              </div>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
      <div className="blogDetail-custom-pagination" />
      <SocialLinks currentUrl={currentUrl} onCopy={handleCopy} />
    </>
  );
};

const SocialLinks = ({ currentUrl, onCopy }) => (
  <div className="detailPageSocialLinks">
    <div className="socialLinkLine" />
    <div className="detailPageSocialLink">
      <Link href="#" onClick={onCopy}>
        <span>
          <Image src="/icons/copyBold.svg" alt="copy" width={10} height={10} />
        </span>
      </Link>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <Image
            src="/icons/facebooklightBlue.svg"
            alt="facebook"
            width={10}
            height={10}
          />
        </span>
      </Link>
      <Link
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <Image
            src="/icons/twitter.svg"
            alt="twitter"
            width={10}
            height={10}
          />
        </span>
      </Link>
      <Link
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          currentUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <Image
            src="/icons/linkedinlightBlue.svg"
            alt="linkedin"
            width={10}
            height={10}
          />
        </span>
      </Link>
    </div>
    <div className="socialLinkLine" />
  </div>
);

export default BlogDetailSlider;
