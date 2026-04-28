// "use client";
// import React, { useState, useMemo } from "react";
// import VideoGaleryCard from "@/components/VideoGaleryCard";
// import Link from "next/link";

// const VideoGalery = ({ t, videoCategoryData = [], videosData = [] }) => {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   // Prepare category list including "All"
//   const categoryList = useMemo(
//     () => ["All", ...videoCategoryData.map((cat) => cat.title)],
//     [videoCategoryData]
//   );

//   // Filter videos based on selected category
//   const filteredVideos = useMemo(() => {
//     if (selectedCategory === "All") return videosData;
//     return videosData.filter(
//       (video) =>
//         Array.isArray(video.category) &&
//         video.category.some((c) => c.title === selectedCategory)
//     );
//   }, [videosData, selectedCategory]);

//   return (
//     <div id="videoGaleryPage">
//       <div className="container">
//         <div className="videoGaleryTop topper">
//           <Link href="/">
//             <strong className="topper">Adentta</strong>
//           </Link>
//           <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
//           <span className="topper">{t?.video || "Video Gallery"}</span>
//         </div>

//         <div className="videoGaleryPageHeaderText">
//           <span>{t?.eventsPageVideo || "Video"}</span>
//           <h1>{t?.video || "Video Gallery"}</h1>
//           <div className="videoGaleryFilter">
//             {categoryList.map((title) => (
//               <h3
//                 key={title}
//                 className={`blgBtn ${selectedCategory === title ? "active" : ""}`}
//                 onClick={() => setSelectedCategory(title)}
//                 style={{
//                   background: title === "All" ? "#D7E0ED" : "transparent",
//                   border: `${selectedCategory === title ? "3px" : "1px"} solid #D7E0ED`,
//                 }}
//               >
//                 {title === "All" ? (t?.allSelect || "All") : title}
//               </h3>
//             ))}
//           </div>
//         </div>

//         <div className="videoGaleryCards">
//           <div className="row">
//             {filteredVideos.map((video) => (
//               <div key={video.id} className="xl-4 lg-4 md-6 sm-12">
//                 <VideoGaleryCard
//                   video={video}
//                   selectedCategory={selectedCategory}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoGalery;




// ! new fast vesion

"use client";
import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import VideoGaleryCard from "@/components/VideoGaleryCard";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

const VideoGalery = ({ t, videoCategoryData = [], initialVideosData = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [list, setList] = useState(initialVideosData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  const fetchingRef = useRef(false);

  const categoryList = useMemo(
    () => ["All", ...videoCategoryData.map((cat) => cat.title)],
    [videoCategoryData]
  );

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || fetchingRef.current) return;
    setLoading(true);
    fetchingRef.current = true;

    try {
      const nextPage = page + 1;
      const res = await axiosInstance.get(`/page-data/video?page=${nextPage}`);
      const newData = res?.data?.data?.data || res?.data?.data || [];

      if (!newData || newData.length === 0) {
        setHasMore(false);
      } else {
        setList((prev) => [...prev, ...newData]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error("loadMore error:", err);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            loadMore();
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore, loading]);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === "All") return list;
    return list.filter(
      (video) =>
        Array.isArray(video.category) &&
        video.category.some((c) => c.title === selectedCategory)
    );
  }, [list, selectedCategory]);

  return (
    <div id="videoGaleryPage">
      <div className="container">
        <div className="videoGaleryTop topper">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{t?.video || "Video Gallery"}</span>
        </div>

        <div className="videoGaleryPageHeaderText">
          <span>{t?.eventsPageVideo || "Video"}</span>
          <h1>{t?.video || "Video Gallery"}</h1>
          <div className="videoGaleryFilter">
            {categoryList.map((title) => (
              <h3
                key={title}
                className={`blgBtn ${selectedCategory === title ? "active" : ""}`}
                onClick={() => setSelectedCategory(title)}
                style={{
                  background: title === "All" ? "#D7E0ED" : "transparent",
                  border: `${selectedCategory === title ? "3px" : "1px"} solid #D7E0ED`,
                }}
              >
                {title === "All" ? (t?.allSelect || "All") : title}
              </h3>
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

          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "40px 0",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  border: "6px solid #f3f3f3",
                  borderTop: "6px solid #293881",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          )}

          <div ref={sentinelRef} style={{ height: 1 }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default VideoGalery;