// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useMemo } from "react";
// import { usePathname } from "next/navigation";

// const monthNamesMap = {
//   az: {
//     1: "yan",
//     2: "fev",
//     3: "mar",
//     4: "apr",
//     5: "may",
//     6: "iyn",
//     7: "iyl",
//     8: "avq",
//     9: "sen",
//     10: "okt",
//     11: "noy",
//     12: "dek",
//   },
//   en: {
//     1: "Jan",
//     2: "Feb",
//     3: "Mar",
//     4: "Apr",
//     5: "May",
//     6: "Jun",
//     7: "Jul",
//     8: "Aug",
//     9: "Sep",
//     10: "Oct",
//     11: "Nov",
//     12: "Dec",
//   },
//   ru: {
//     1: "янв",
//     2: "фев",
//     3: "мар",
//     4: "апр",
//     5: "май",
//     6: "июн",
//     7: "июл",
//     8: "авг",
//     9: "сен",
//     10: "окт",
//     11: "ноя",
//     12: "дек",
//   },
// };

// const BlogPages = ({ t, blogData = [], blogsCategoryData = [] }) => {
//   const pathname = usePathname() || "";
//   const detected = pathname.split("/")[1];
//   const locale = ["az", "en", "ru"].includes(detected) ? detected : "az";

//   const allLabel = t?.allSelect || "All";
//   const [selectedCategory, setSelectedCategory] = useState(allLabel);

//   const categoryList = useMemo(
//     () => [allLabel, ...blogsCategoryData.map((cat) => cat.title)],
//     [blogsCategoryData, allLabel]
//   );

//   const filteredBlogs = useMemo(() => {
//     const list = Array.isArray(blogData) ? [...blogData] : [];

//     const byCategory =
//       selectedCategory === allLabel
//         ? list
//         : list.filter(
//             (blog) =>
//               Array.isArray(blog.category) &&
//               blog.category.some((c) => c.title === selectedCategory)
//           );

//     byCategory.sort((a, b) => {
//       const dateA = Date.parse(a.published_date);
//       const dateB = Date.parse(b.published_date);
//       return dateB - dateA;
//     });

//     return byCategory;
//   }, [blogData, selectedCategory, allLabel]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const timestamp = Date.parse(dateString);
//     if (isNaN(timestamp)) return "";

//     const date = new Date(timestamp);
//     const day = date.getDate().toString().padStart(2, "0");
//     const monthIndex = date.getMonth() + 1;
//     const year = date.getFullYear();

//     const monthName =
//       monthNamesMap[locale]?.[monthIndex] ||
//       new Intl.DateTimeFormat(locale, { month: "short" }).format(date);

//     return `${day} ${monthName} ${year}`;
//   };

//   return (
//     <div className="blogPage">
//       <div className="container">
//         <div className="blogTop topper">
//           <Link href="/">
//             <strong className="topper">Adentta</strong>
//           </Link>
//           <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
//           <span className="topper">{t?.blogs || "Blogs"}</span>
//         </div>

//         <div className="blogPageHeaderText">
//           <span>{t?.blogsPageNews || "Blog news"}</span>
//           <h1>{t?.blogsPageExploreOurBlogs || "Explore Our Blogs"}</h1>
//           <div className="blogFilter">
//             {categoryList.map((title) => {
//               const isActive = selectedCategory === title;
//               const isAll = title === allLabel;

//               // Normal: 1px border, Active: 3px border (both #D7E0ED), "All" button background #D7E0ED
//               const btnStyle = {
//                 background: isAll ? "#D7E0ED" : "transparent",
//                 border: isActive ? "3px solid #D7E0ED" : "1px solid #D7E0ED",
//               };

//               return (
//                 <button
//                   key={title}
//                   className={`blgBtn ${isActive ? "active" : ""}`}
//                   onClick={() => setSelectedCategory(title)}
//                   style={btnStyle}
//                 >
//                   {title}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <div className="blogCards">
//           <div className="row">
//             {filteredBlogs.map((blog) => (
//               <div key={blog.id} className="xl-3 lg-4 md-6 sm-12">
//                 <div className="ourBlog">
//                   <Link
//                     href={`/blogs/${(blog?.slug || blog?.title)
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}-${blog.id}`}
//                   >
//                     <div className="blogCard">
//                       <div className="blogCardImage">
//                         {blog.image && (
//                           <Image
//                             src={`https://admin.adentta.az/storage${blog.image}`}
//                             alt={blog.title}
//                             width={300}
//                             height={300}
//                           />
//                         )}
//                         {blog.published_date &&
//                           !isNaN(Date.parse(blog.published_date)) && (
//                             <div className="blogCardImageDate">
//                               <span className="blogCardDate">
//                                 {formatDate(blog.published_date)}
//                               </span>
//                             </div>
//                           )}
//                       </div>

//                       <div className="blogCardContent">
//                         <span>{blog.title}</span>
//                         <div
//                           dangerouslySetInnerHTML={{ __html: blog.content }}
//                         />
//                       </div>

//                       <div className="blogCardBottom">
//                         <span>{t?.learnMore || "Learn More"}</span>
//                         <img src="/icons/arrowTopRight.svg" alt="" />
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPages;






// !.!













"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axiosInstance from "@/lib/axios";

const monthNamesMap = {
  az: {
    1: "yan",
    2: "fev",
    3: "mar",
    4: "apr",
    5: "may",
    6: "iyn",
    7: "iyl",
    8: "avq",
    9: "sen",
    10: "okt",
    11: "noy",
    12: "dek",
  },
  en: {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  },
  ru: {
    1: "янв",
    2: "фев",
    3: "мар",
    4: "апр",
    5: "май",
    6: "июн",
    7: "июл",
    8: "авг",
    9: "сен",
    10: "окт",
    11: "ноя",
    12: "дек",
  },
};

const BlogPages = ({ t, initialBlogData = [], blogsCategoryData = [] }) => {
  const pathname = usePathname() || "";
  const detected = pathname.split("/")[1];
  const locale = ["az", "en", "ru"].includes(detected) ? detected : "az";

  const allLabel = t?.allSelect || "All";
  const [selectedCategory, setSelectedCategory] = useState(allLabel);

  const [list, setList] = useState(initialBlogData || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  const fetchingRef = useRef(false);

  const categoryList = useMemo(
    () => [allLabel, ...blogsCategoryData.map((cat) => cat.title)],
    [blogsCategoryData, allLabel]
  );

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || fetchingRef.current) return;
    setLoading(true);
    fetchingRef.current = true;

    try {
      // 1 saniyə delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const nextPage = page + 1;
      const res = await axiosInstance.get(`/page-data/blog?page=${nextPage}`);
      const newData = res?.data?.data?.data || res?.data?.data || [];

      if (!newData || newData.length === 0) {
        setHasMore(false);
      } else {
        setList((prev) => [...prev, ...newData]);
        setPage(nextPage);

        const meta = res?.data?.data?.meta || res?.data?.meta || null;
        if (meta) {
          const current = meta.current_page ?? nextPage;
          const last =
            meta.last_page ??
            (meta.total && meta.per_page
              ? Math.ceil(meta.total / meta.per_page)
              : null);
          if (last !== null) setHasMore(current < last);
        } else {
          const perPage = res?.data?.data?.meta?.per_page ?? 12;
          if (newData.length < perPage) setHasMore(false);
        }
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
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore, loading]);

  const filteredBlogs = useMemo(() => {
    const blogList = Array.isArray(list) ? [...list] : [];

    const byCategory =
      selectedCategory === allLabel
        ? blogList
        : blogList.filter(
            (blog) =>
              Array.isArray(blog.category) &&
              blog.category.some((c) => c.title === selectedCategory)
          );

    byCategory.sort((a, b) => {
      const dateA = Date.parse(a.published_date);
      const dateB = Date.parse(b.published_date);
      return dateB - dateA;
    });

    return byCategory;
  }, [list, selectedCategory, allLabel]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) return "";

    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();

    const monthName =
      monthNamesMap[locale]?.[monthIndex] ||
      new Intl.DateTimeFormat(locale, { month: "short" }).format(date);

    return `${day} ${monthName} ${year}`;
  };

  return (
    <div className="blogPage">
      <div className="container">
        <div className="blogTop topper">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{t?.blogs || "Blogs"}</span>
        </div>

        <div className="blogPageHeaderText">
          <span>{t?.blogsPageNews || "Blog news"}</span>
          <h1>{t?.blogsPageExploreOurBlogs || "Explore Our Blogs"}</h1>
          <div className="blogFilter">
            {categoryList.map((title) => {
              const isActive = selectedCategory === title;
              const isAll = title === allLabel;

              const btnStyle = {
                background: isAll ? "#D7E0ED" : "transparent",
                border: isActive ? "3px solid #D7E0ED" : "1px solid #D7E0ED",
              };

              return (
                <button
                  key={title}
                  className={`blgBtn ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedCategory(title)}
                  style={btnStyle}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="blogCards">
          <div className="row">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="xl-3 lg-4 md-6 sm-12">
                <div className="ourBlog">
                  <Link
                    href={`/blogs/${(blog?.slug || blog?.title)
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${blog.id}`}
                  >
                    <div className="blogCard">
                      <div className="blogCardImage">
                        {blog.image && (
                          <Image
                            src={`https://admin.adentta.az/storage${blog.image}`}
                            alt={blog.title}
                            width={300}
                            height={300}
                          />
                        )}
                        {blog.published_date &&
                          !isNaN(Date.parse(blog.published_date)) && (
                            <div className="blogCardImageDate">
                              <span className="blogCardDate">
                                {formatDate(blog.published_date)}
                              </span>
                            </div>
                          )}
                      </div>

                      <div className="blogCardContent">
                        <span>{blog.title}</span>
                        <div
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                      </div>

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

          {/* Loading spinner - kartların altında, tam ortada */}
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: "40px",
                marginBottom: "40px",
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

          {/* sentinel — observer üçün */}
          <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPages;