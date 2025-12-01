import Image from "next/image";
import React from "react";
import SecondBlogDetailSlider from "./Sliders/SecondBlogDetailSlider";
import Link from "next/link";

const BlogsDetailPage = ({ t, blogDetail, otherBlogs }) => {
  return (
    <div id="blogDetailPage">
      <div className="container">
        <div className="blogDetailTop topper">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <Link href="/blogs">
            <span className="topper">{t?.blogs || "Blogs"}</span>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{blogDetail.title}</span>
        </div>

        <div className="blogDetailPage">
          <div className="blogDetailInner">
            <div className="blogDetailHeaderText">
              <h1>{blogDetail.title}</h1>
              <div className="seeView">
                {/* <span>{blogDetail.published_date}</span> */}

                {blogDetail?.published_date && (
                  <span>{blogDetail.published_date}</span>
                )}

                {/* <span>
                  {blogDetail.read_time} {t?.blogsPageRead || "minutes read"}
                </span> */}
              </div>
            </div>
            <div className="blogDetailImage">
              <Image
                // src="/images/blogDetailImg.png"
                src={`https://admin.adentta.az/storage${blogDetail.image}`}
                alt="blogDetail"
                width={1500}
                height={800}
              />
            </div>
            <div className="blogDetailText">
              {/* <span>{blogDetail.title}</span> */}
              {/* <p>
              </p> */}
              <div
                className="paragraphBlog"
                dangerouslySetInnerHTML={{ __html: blogDetail.content }}
              />
              {/* <br />
              <div className="blogDetailBottom">
                <span>Quos nisi redarguimus, omnis virtus</span>
                <div className="blogDetailBottomText">
                  <p>
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="blogDetailSlider">
          <SecondBlogDetailSlider t={t} blogDetail={blogDetail} />
        </div>

        <div className="blogDetailBottomCard">
          <span>{t?.blogsPageOtherBlogs || "Other Blogs"}</span>
          <div className="blogCards">
            <div className="row">
              {otherBlogs.splice(0, 4).map((blog) => (
                <div key={blog.id} className="xl-3 lg-4 md-6 sm-12">
                  <div className="ourBlog">
                    <Link
                      // href={`/blogs/${blog?.slug
                      //   ?.toLowerCase()
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
                              width={300}
                              height={300}
                            />
                          )}
                          {/* <div className="blogCardImageDate">
                            <span className="blogCardDate">
                              {blog.published_date}
                            </span>
                          </div> */}
                        </div>

                        <div className="blogCardContent">
                          
                          <span>{blog.title}</span>
                          <div
                            className="paragraphBlog"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetailPage;
