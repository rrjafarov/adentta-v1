"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
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

const convertYouTubeToEmbed = (url) => {
  if (!url || !url.includes("watch?v=")) return url;
  const videoId = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${videoId}`;
};

const ContactVideo = ({ videoUrl, videoTitle }) => {
  const embedUrl = convertYouTubeToEmbed(videoUrl);

  return (
    // <div className="contactPageAdress">
    //   <Link
    //     // href={"https://www.youtube.com/watch?v=93H-FqHYiEE"}
    //     href={videoUrl}
    //     target="_blank"
    //     className="contactVideo"
    //     data-fancybox="videos"
    //   >
    //     <div className="contactPageAdressVideo">
    //       <LazyLoadImage
    //         src="/images/contactParallaxImg.png"
    //         effect="blur"
    //         className="contactPageCardVideo"
    //       />
    //         <div className="contactPageAdressVideoText">
    //           <span>VIDEO</span>
    //           {/* <p>Advanced Equipments for Better Care</p> */}
    //           <p>{videoTitle}</p>
    //           <div className="contactPagePlayIcon">
    //             <Image
    //               src="/icons/videoPlayIcon.svg"
    //               alt="play"
    //               width={28}
    //               height={28}
    //             />
    //           </div>
    //         </div>
    //     </div>
    //   </Link>
    // </div>

    <div className="contactPageAdress">
      <div style={{ position: "relative", paddingBottom: "45%", height: 0 }}>
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            borderRadius: "2rem",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default ContactVideo;
