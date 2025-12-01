import Image from "next/image";
import React from "react";

const AboutPageDirector = ({
  directorName,
  directorTitle,
  directorImage,
  directorImage2,
  directorMessage,
}) => {
  return (
    <div className="directorMessage">
      <div className="row">
        <div className="xl-6 md-6 lg-6 sm-12">
          <div className="directorMessageLeft">
            <div className="directorAvatar">
              <Image
                // src="/images/directorIMG.png"
                src={`https://admin.adentta.az/storage${directorImage}`}
                alt="director"
                width={400}
                height={400}
              />
              <div className="directorOffice">
                <Image
                  // src="/images/directorOfficeIMG.png"
                  src={`https://admin.adentta.az/storage${directorImage2}`}
                  alt="director"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="xl-6 md-6 lg-6 sm-12">
          <div className="directorMessageRight">
            <h3>
              {directorTitle}
              <div className="nail-top">
                <Image src="/images/nail.png" alt="" width={100} height={100} />
              </div>
            </h3>
            <div className="directorSecondParagraph">
              <div dangerouslySetInnerHTML={{ __html: directorMessage }}></div>

              <div className="nail-bottom">
                <Image src="/images/nail.png" alt="" width={100} height={100} />
              </div>
            </div>
            <div className="directorLine"></div>

            <div className="directorSignaturess">
              <span>{directorName}</span>
              <Image
                src="/icons/signature.svg"
                alt="signature"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageDirector;
