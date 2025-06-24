"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";

const BlogPages = ({ t, blogData = [], blogsCategoryData = [] }) => {
  const allLabel = t?.allSelect || "All";
  const [selectedCategory, setSelectedCategory] = useState(allLabel);

  const categoryList = useMemo(
    () => [allLabel, ...blogsCategoryData.map((cat) => cat.title)],
    [blogsCategoryData, allLabel]
  );

  const filteredBlogs = useMemo(() => {
    // 1) Orijinalı korumak için klon al
    const list = Array.isArray(blogData) ? [...blogData] : [];

    // 2) Kategoriye göre filtrele (All seçiliyse direk tüm liste)
    const byCategory =
      selectedCategory === allLabel
        ? list
        : list.filter(
            (blog) =>
              Array.isArray(blog.category) &&
              blog.category.some((c) => c.title === selectedCategory)
          );

    // 3) Tarihe göre sırala (yeniden eskiye doğru)
    byCategory.sort((a, b) => {
      const dateA = Date.parse(a.published_date);
      const dateB = Date.parse(b.published_date);
      return dateB - dateA; // büyük (yeni) önce
    });

    return byCategory;
  }, [blogData, selectedCategory, allLabel]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) return "";

    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const azMonths = {
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
    };
    const month = azMonths[date.getMonth() + 1];
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="blogPage">
      <div className="container">
        <div className="blogTop topper">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{t?.blogs || "Blogs"}</h4>
        </div>

        <div className="blogPageHeaderText">
          <h2>{t?.blogsPageNews || "Blog news"}</h2>
          <span>{t?.blogsPageExploreOurBlogs || "Explore Our Blogs"}</span>
          <div className="blogFilter">
            {categoryList.map((title) => (
              <button
                key={title}
                className={`blgBtn ${
                  selectedCategory === title ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(title)}
                style={{ background: "transparent" }}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        <div className="blogCards">
          <div className="row">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="xl-3 lg-4 md-6 sm-12">
                <div className="ourBlog">
                  <Link
                    // href={`/blogs/${blog?.slug?.toLowerCase()
                    //   .replace(/\s+/g, "-")}-${blog.id}`}
                    href={`/blogs/${(blog?.slug || blog?.title)
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}-${blog.id}`}
                  >
                    <div className="blogCard">
                      <div className="blogCardImage">
                        {blog.image && (
                          <Image
                            src={`https://admin.adentta.az/storage${blog.image}`}
                            alt={blog.title}
                            width={400}
                            height={400}
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
        </div>
      </div>
    </div>
  );
};

export default BlogPages;
