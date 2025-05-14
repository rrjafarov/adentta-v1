import React from "react";

const LittleCard = ({t}) => {
  return (
    <>
      <div className="container littleCard ">
        <div className=" littleCardItem">
          <div className="littleCardItemIcon">
            <img src="icons/timerCarIcon.svg" alt="" />
          </div>
          <div className="littleCardItemText">
            {/* <span>Çatdırılma</span> */}
            <span>{t?.deliver || "Delivery"}</span>
            <p>{t?.deliveryContent || "Free delivery to all our regions	"}</p>
          </div>
        </div>

        <div className=" littleCardItem ">
          <div className="littleCardItemIcon">
            <img src="icons/percentIcon.svg" alt="" />
          </div>
          <div className="littleCardItemText">
            <span>{t?.affordablePrice || "Affrodable Price"}</span>
            <p>{t?.affordablePriceContent || "With a 20% down payment"}</p>
          </div>
        </div>

        <div className=" littleCardItem ">
          <div className="littleCardItemIcon">
            <img src="icons/servicesStarIcon.svg" alt="" />
          </div>
          <div className="littleCardItemText">

            <span>{t?.ourService || "Our Service"}</span>
            <p>{t?.ourServiceContent || "Always at your service!"}</p>
          </div>
        </div>

        <div className=" littleCardItem ">
          <div className="littleCardItemIcon">
            <img src="icons/educationIcon.svg" alt="" />
          </div>
          <div className="littleCardItemText">

            <span>{t?.traningAndEducation || "Training and Education"}</span>
            <p>{t?.traningAndEducationContent || "Practical and theoretical sessions are conducted for each device"}</p>

          </div>
        </div>
      </div>
    </>
  );
};

export default LittleCard;
