import Image from "next/image";
import React from "react";

const ContactPageMap = ({
  t,
  email,
  locationHeadOffice,
  locationStore,
  map,
}) => {
  return (
    <div>
      {/* <div className="container"> */}
      <div className="adressMap">
        <div className="adressMapHead">
          <h2>{t?.contactPageMapTitle || "Map"}</h2>
        </div>
        <div className="row">
          <div className="xl-6 lg-6 md-6 sm-12">
            <div className="mapSectionAll">
              <div className="mapSectionContent">
                <div className="mapStoreItem">
                  <h3>{t?.contactPageStore || "store"}</h3>
                  <div className="mapStoreInner">
                    <Image
                      src="/icons/boldEmail.svg"
                      alt="Email"
                      width={100}
                      height={100}
                    />
                    <p>{email}</p>
                  </div>
                  <div className="mapStoreInner">
                    <Image
                      src="/icons/boldLocation.svg"
                      alt="Email"
                      width={100}
                      height={100}
                    />
                    <p>{locationStore}</p>
                  </div>
                </div>
                <div className="mapContentLine"></div>

                <div className="mapStoreItem">
                  <h3>{t?.contacntPageHeadOffice || "store"}</h3>
                  <div className="mapStoreInner">
                    <Image
                      src="/icons/boldEmail.svg"
                      alt="Email"
                      width={100}
                      height={100}
                    />
                    <p>{email}</p>
                  </div>
                  <div className="mapStoreInner">
                    <Image
                      src="/icons/boldLocation.svg"
                      alt="Email"
                      width={100}
                      height={100}
                    />
                    <p>{locationHeadOffice}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl-6 lg-6 md-6 sm-12">
            <div className="googleMaps">
              <iframe
                src={map}
                // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6053.002363715256!2d49.83345324466994!3d40.400657556130554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d25b8009a99%3A0x10fc8ff68fd2f7fb!2sADENTTA%20(Ba%C5%9F%20ofis)!5e1!3m2!1str!2saz!4v1740046099723!5m2!1str!2saz"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ContactPageMap;
