import Image from "next/image";
import Link from "next/link";
import React from "react";

const Support = ({ t, title, content }) => {
  return (
    <div className="supportPage">
      <div className="container">
        <div className="supportTop topper">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{t?.userTermsPage || "User Terms"}</h4>
        </div>
        <div className="supportPageHeaderText">
          <h2>{t?.supportPageTitle || "Support"}</h2>
          <span>{t?.userTermsPage || "User Terms"}</span>
        </div>
        <div className="supportPageContent">
          <div className="supportPageContentText">
            <div className="supportPageContentTextInner">
              {/* <span>Terms and Conditions:</span> */}
              <span>{title}</span>
              <div className="supportPageContentTextInnerParagraph">
                {/* <p>
                  Quasi vero aut concedatur in omnibus stultis aeque magna esse
                  vitia, et eadem inbecillitate et inconstantia L. Levatio
                  igitur vitiorum magna fit in iis, qui habent ad virtutem
                  progressionis aliquantum. Tertium autem omnibus aut maximis
                  rebus iis, quae secundum naturam sint, fruentem vivere.
                  Materiam vero rerum et copiam apud hos exilem, apud illos
                  uberrimam reperiemus. Atque his de rebus et splendida est
                  eorum et illustris oratio.
                </p> */}
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </div>
            </div>

            <div className="supportPageContentTextInner">
              <span>{title}</span>
              <div className="supportPageContentTextInnerVirtus">
                <Image src="/icons/dotIMG.svg" alt="" width={5} height={5} />
                {/* <p>
                  Quos nisi redarguimus, omnis virtus, omne decus, omnis vera
                  laus deserenda est. Sed eum qui audiebant, quoad poterant,
                  defendebant sententiam suam. Fatebuntur Stoici haec omnia
                  dicta esse praeclare, neque eam causam Zenoni desciscendi
                  fuisse.
                </p> */}
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </div>
              {/* <div className="supportPageContentTextInnerVirtus">
                <Image src="/icons/dotIMG.svg" alt="" width={5} height={5} />
                <p>
                  Quos nisi redarguimus, omnis virtus, omne decus, omnis vera
                  laus deserenda est. Sed eum qui audiebant
                </p>
              </div>
              <div className="supportPageContentTextInnerVirtus">
                <Image src="/icons/dotIMG.svg" alt="" width={5} height={5} />
                <p>Quos nisi redarguimus, omnis virtus, omne decus, omn</p>
              </div>
              <div className="supportPageContentTextInnerVirtus">
                <Image src="/icons/dotIMG.svg" alt="" width={5} height={5} />
                <p>
                  Quos nisi redarguimus, omnis virtus, omne decus, omnis vera
                  laus deserenda est. Sed eum qui audiebant, quoad poterant,
                  defendebant sententiam suam.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
