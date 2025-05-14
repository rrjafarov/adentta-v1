import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactPageLink = ({
  wpNumber,
  phone,
  email,
  wpLink,
  linkedin,
  instagram,
  facebook,
  locationHeadOffice,
  workHoursMondayFriday,
  workHoursSaturday,
  t,
}) => {
  return (
    <div>
      <div className="contentPageLinkCards">
        <div className="contentPageLinkCard">
          <span>{t?.contactPageWhatsapp}:</span>
          <div className="contentPageLinkCardContent">
            <Image
              src="/icons/boldWhatsapp.svg"
              alt="whatsapp"
              width={100}
              height={100}
            />
            <span>{wpNumber}</span>
          </div>
        </div>
        <div className="contentPageLinkCard">
          <span>{t?.contactPagePhone || "phone"}:</span>
          <div className="contentPageLinkCardContent">
            <Image
              src="/icons/boldPhone.svg"
              alt="phone"
              width={100}
              height={100}
            />
            <span>{phone}</span>
          </div>
        </div>
        <div className="contentPageLinkCard">
          <span>{t?.contactPageEmail || "email"}:</span>
          <div className="contentPageLinkCardContent">
            <Image
              src="/icons/boldEmail.svg"
              alt="phone"
              width={100}
              height={100}
            />
            {/* <span>office@adentta.az</span> */}
            <span>{email}</span>
          </div>
        </div>
        <div className="contentPageLinkCard">
          <span>{t?.contactPageLocation || "location"}:</span>
          <div className="contentPageLinkCardContent">
            <Image
              src="/icons/boldLocation.svg"
              alt="phone"
              width={100}
              height={100}
            />
            <span>{locationHeadOffice}</span>
          </div>
        </div>
        <div className="contentPageLinkCard">
          <span>{t?.contactPageWorkingHours || "working hours"}:</span>
          <div className="contentPageLinkCardContent">
            <Image
              src="/icons/boldTimerCircle.svg"
              alt="phone"
              width={100}
              height={100}
            />
            <span>
              {t?.mondayToFriday || "Bazar ertəsi-Cümə"}: <strong>{workHoursMondayFriday}</strong> /
              {t?.saturday || "Şənbə"}:<strong>{workHoursSaturday}</strong>
            </span>
          </div>
        </div>
        <div className="contentPageLinkCard">
          <span>{t?.contactPageSocials || "socials"}:</span>
          <div className="contentPageLinkCardContent">
            <div className="contactSocialIcons">
              <ul>
                <li>
                  <Link href={wpLink} target="_blank">
                    <img src="/icons/whatsappNormal.svg" alt="" />
                  </Link>
                </li>
                <li>
                  <Link href={linkedin} target="_blank">
                    <img src="/icons/linkedinNormal.svg" alt="" />
                  </Link>
                </li>
                <li>
                  <Link href={instagram} target="_blank">
                    <img src="/icons/instagramNormal.svg" alt="" />
                  </Link>
                </li>
                <li>
                  <Link href={facebook} target="_blank">
                    <img src="/icons/facebookNormal.svg" alt="" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageLink;
