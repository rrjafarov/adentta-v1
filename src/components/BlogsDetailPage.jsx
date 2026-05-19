import Image from "next/image";
import React from "react";
import SecondBlogDetailSlider from "./Sliders/SecondBlogDetailSlider";
import Link from "next/link";

const generateSlug = (text = "") => {
  return text
    .toLowerCase()
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const BlogsDetailPage = ({ t, blogDetail, otherBlogs }) => {
  return (
    <div id="blogDetailPage">
      <div className="container">

        {/* BREADCRUMB */}
        <div className="blogDetailTop topper">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>

          <img className="topper" src="/icons/rightDown.svg" alt="" />

          <Link href="/blogs">
            <span className="topper">{t?.blogs || "Blogs"}</span>
          </Link>

          <img className="topper" src="/icons/rightDown.svg" alt="" />

          <span className="topper">{blogDetail.title}</span>
        </div>

        {/* DETAIL */}
        <div className="blogDetailPage">
          <div className="blogDetailInner">

            <div className="blogDetailHeaderText">
              <h1>{blogDetail.title}</h1>

              {blogDetail?.published_date && (
                <div className="seeView">
                  <span>{blogDetail.published_date}</span>
                </div>
              )}
            </div>

            <div className="blogDetailImage">
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${blogDetail.image}`}
                alt={blogDetail.title}
                width={1500}
                height={800}
              />
            </div>

            <div className="blogDetailText">
              <div
                className="paragraphBlog"
                dangerouslySetInnerHTML={{
                  __html: blogDetail.content,
                }}
              />
            </div>
          </div>
        </div>

        {/* SLIDER */}
        <div className="blogDetailSlider">
          <SecondBlogDetailSlider t={t} blogDetail={blogDetail} />
        </div>

        {/* OTHER BLOGS */}
        <div className="blogDetailBottomCard">
          <span>{t?.blogsPageOtherBlogs || "Other Blogs"}</span>

          <div className="blogCards">
            <div className="row">
              {otherBlogs?.slice(0, 4).map((blog) => {
                const slug = blog?.slug || generateSlug(blog?.title);

                return (
                  <div key={blog.id} className="xl-3 lg-4 md-6 sm-12">
                    <div className="ourBlog">
                      <Link href={`/blogs/${slug}-${blog.id}`}>
                        <div className="blogCard">

                          <div className="blogCardImage">
                            {blog.image && (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${blog.image}`}
                                alt={blog.title}
                                width={300}
                                height={300}
                              />
                            )}
                          </div>

                          <div className="blogCardContent">
                            <span>{blog.title}</span>

                            <div
                              className="paragraphBlog paragraphBlogPrivate"
                              dangerouslySetInnerHTML={{
                                __html: blog.content,
                              }}
                            />
                          </div>

                          <div className="blogCartLine"></div>

                          <div className="blogCardBottom">
                            <span>{t?.learnMore || "Learn More"}</span>
                            <img src="/icons/arrowTopRight.svg" alt="" />
                          </div>

                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogsDetailPage;