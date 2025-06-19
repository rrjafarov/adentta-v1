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
            <h1 className="topper">Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <Link href="/blogs">
            <h4 className="topper">{t?.blogs || "Blogs"}</h4>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{blogDetail.title}</h4>
        </div>

        <div className="blogDetailPage">
          <div className="blogDetailInner">
            <div className="blogDetailHeaderText">
              <h5>{blogDetail.title}</h5>
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
                width={800}
                height={500}
              />
            </div>
            <div className="blogDetailText">
              <span>{blogDetail.title}</span>
              {/* <p>
              </p> */}
              <div
                className="porto"
                dangerouslySetInnerHTML={{ __html: blogDetail.content }}
              />
              <br />
              <div className="blogDetailBottom">
                {/* <span>Quos nisi redarguimus, omnis virtus</span> */}
                <div className="blogDetailBottomText">
                  {/* <p>
                  </p> */}
                </div>
              </div>
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
                      href={`/blogs/${blog?.title
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
                          {/* <div className="blogCardImageDate">
                            <span className="blogCardDate">
                              {blog.published_date}
                            </span>
                          </div> */}
                        </div>

                        <div className="blogCardContent">
                          {/* <span>Top 5 Innovations Transforming Dentistry</span>
                          <p>
                            Discover the latest advancements revolutionizing
                            dental care..
                          </p> */}
                          <span>{blog.title}</span>
                          <div
                            className="porto"
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
