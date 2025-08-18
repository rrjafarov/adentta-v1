"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
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

const VideoGaleryCard = ({ video, selectedCategory = "All" }) => {
  // API-dən gələn məlumatlara əsasən dəyərlərin təyin edilməsi
  const videoTitle = video?.video_title || "Default Video Title";
  const videoUrl = video?.video_url || "https://www.youtube.com/watch?v=EuBpxj-8WV0";
  const thumbnail = video?.video_cover || "/images/videoGaleryCardIMG.png";

  // Filter logic: only render if matches selectedCategory or "All"
  const hasCategory =
    Array.isArray(video.category) &&
    video.category.some((c) => c.title === selectedCategory);

  if (selectedCategory !== "All" && !hasCategory) {
    return null;
  }

  return (
    <div className="videoGaleryCard">
      <div className="videoGaleryCardItem">
        <Link href={videoUrl} className="galleryImg" data-fancybox="videos">
          <span className="videoTitle">{videoTitle}</span>

          <div className="videoGaleryImg">
            <LazyLoadImage
              src={`https://admin.adentta.az/storage${thumbnail}`}
              effect="blur"
              className="videoGaleryCardImg"
            />
            <div className="videoGaleryPlay">
              <span>play</span>
              <Image
                src="/icons/videoGaleryPlay.svg"
                alt="play"
                width={100}
                height={100}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VideoGaleryCard;
