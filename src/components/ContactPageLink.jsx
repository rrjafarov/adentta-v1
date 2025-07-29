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
          <Link
            href={`https://wa.me/${wpNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
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
          </Link>
        </div>

        <div className="contentPageLinkCard">
          <span>{t?.contactPagePhone || "phone"}:</span>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="contentPageLinkCardContent"
          >
            <Image
              src="/icons/boldPhone.svg"
              alt="phone"
              width={100}
              height={100}
            />
            <span>{phone}</span>
          </a>
        </div>

        <div className="contentPageLinkCard">
          <span>{t?.contactPageEmail || "email"}:</span>
          <a href={`mailto:${email}`} className="contentPageLinkCardContent">
            <Image
              src="/icons/boldEmail.svg"
              alt="email"
              width={100}
              height={100}
            />
            <span>{email}</span>
          </a>
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
              {t?.mondayToFriday || "Bazar ertəsi-Cümə"}:{" "}
              <strong>{workHoursMondayFriday}</strong> /{t?.saturday || "Şənbə"}
              :<strong>{workHoursSaturday}</strong>
            </span>
          </div>
        </div>
        <div className="contentPageLinkCard">
          <span>{t?.contactPageSocials || "socials"}:</span>
          <div className="contentPageLinkCardContent">
            <div className="contactSocialIcons">
              <ul>
                <Link href={wpLink} target="_blank">
                  <li>
                    <img src="/icons/whatsappNormal.svg" alt="" />
                  </li>
                </Link>

                <Link href={linkedin} target="_blank">
                  <li>
                    <img src="/icons/linkedinNormal.svg" alt="" />
                  </li>
                </Link>

                <Link href={instagram} target="_blank">
                  <li>
                    <img src="/icons/instagramNormal.svg" alt="" />
                  </li>
                </Link>
                <Link href={facebook} target="_blank">
                  <li>
                    <img src="/icons/facebookNormal.svg" alt="" />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageLink;
