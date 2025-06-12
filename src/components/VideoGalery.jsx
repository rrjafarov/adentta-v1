
// *
"use client";
import React, { useState, useMemo } from "react";
import VideoGaleryCard from "@/components/VideoGaleryCard";
import Link from "next/link";

const VideoGalery = ({ t, videoCategoryData = [], videosData = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Prepare category list including "All"
  const categoryList = useMemo(
    () => [ t?.allSelect || "All", ...videoCategoryData.map((cat) => cat.title)],
    [videoCategoryData]
  );

  // Filter videos based on selected category
  const filteredVideos = useMemo(() => {
    if (selectedCategory === "All") return videosData;
    return videosData.filter(
      (video) =>
        Array.isArray(video.category) &&
        video.category.some((c) => c.title === selectedCategory)
    );
  }, [videosData, selectedCategory]);

  return (
    <div id="videoGaleryPage">
      <div className="container">
        <div className="videoGaleryTop topper">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{t?.video || "Video Gallery"}</h4>
        </div>

        <div className="videoGaleryPageHeaderText">
          <h2>{t?.eventsPageVideo || "Video"}</h2>
          <span>{t?.video || "Video Gallery"}</span>
          <div className="videoGaleryFilter">
            {categoryList.map((title) => (
              <button
                key={title}
                className={`blgBtn ${
                  selectedCategory === title ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(title)}
                style={{
                  background: "transparent", 
                }}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        <div className="videoGaleryCards">
          <div className="row">
            {filteredVideos.map((video) => (
              <div key={video.id} className="xl-4 lg-4 md-6 sm-12">
                <VideoGaleryCard
                  video={video}
                  selectedCategory={selectedCategory}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGalery;
