
// *
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";

const BlogPages = ({ t, blogData = [], blogsCategoryData = [] }) => {
  // "All" etiketini dinamik olarak alıyoruz
  const allLabel = t?.allSelect || "All";
  const [selectedCategory, setSelectedCategory] = useState(allLabel);

  // Prepare category list including dynamic "All"
  const categoryList = useMemo(
    () => [allLabel, ...blogsCategoryData.map((cat) => cat.title)],
    [blogsCategoryData, allLabel]
  );

  // Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    // Eğer seçili kategori "All" (veya t?.allSelect) ise, tüm blogları döndür
    if (selectedCategory === allLabel) {
      return blogData;
    }
    return blogData.filter(
      (blog) =>
        Array.isArray(blog.category) &&
        blog.category.some((c) => c.title === selectedCategory)
    );
  }, [blogData, selectedCategory, allLabel]);

  // Tarihleri Azerbaycan dillerine uygun formatlama fonksiyonu
  const formatDate = (dateString) => {
    const date = new Date(dateString);
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
                    href={`/blogs/${blog.title
                      .toLowerCase()
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
                        <div className="blogCardImageDate">
                          <span className="blogCardDate">
                            {formatDate(blog.published_date)}
                          </span>
                        </div>
                      </div>

                      <div className="blogCardContent">
                        <span>{blog.title}</span>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
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

// *