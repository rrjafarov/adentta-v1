import React from "react";
import Image from "next/image";
import BlogDetailSlider from "./Sliders/BlogDetailSlider";
import Link from "next/link";
import Cookies from "js-cookie";

const EventsDetailPage = ({ t, eventsDetail, otherEvents }) => {
  const lang = Cookies.get("NEXT_LOCALE") || "az";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    let month;
    if (lang === "az") {
      // Azerbaijani month abbreviations
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
      month = azMonths[date.getMonth() + 1];
    } else {
      month = new Intl.DateTimeFormat(lang, { month: "short" })
        .format(date)
        .replace(".", "");
    }

    return `${day} ${month} ${year}`;
  };
  return (
    <div id="eventDetailPage">
      <div className="container">
        <div className="eventDetailTop topper">
          <Link href="/">
            <h1>Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <Link href="/events">
            <h4>{t?.events || "Events"}</h4>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4>{eventsDetail.title}</h4>
        </div>

        <div className="eventDetailPage">
          <div className="eventDetailInner">
            <div className="eventDetailHeaderText">
              <h3>{t?.eventsPageEventDetails || "Events details"}</h3>
              <h5>{eventsDetail.title}</h5>
              <div className="detailCalendar">
                <div className="detailCalendarItem">
                  <img src="/icons/date.svg" alt="Calendar" />
                  <div className="detailCalendarContent">
                    <span>{formatDate(eventsDetail.event_start_date)}</span>
                    {/* <p>19:00</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="eventDetailImage">
              <Image
                // src="/images/eventDetailBanner.png"
                src={`https://admin.adentta.az/storage${eventsDetail.image}`}
                alt="eventDetail"
                width={600}
                height={400}
              />
            </div>

            <div className="eventDetailText">
              {/* <span>Atque his de rebus et splendida est eorum et</span> */}
              <div
                className="porto"
                dangerouslySetInnerHTML={{ __html: eventsDetail.content }}
              />

              <br />
            </div>
          </div>
        </div>

        <div className="blogDetailSlider">
          <BlogDetailSlider t={t} eventsDetail={eventsDetail} />
        </div>

        <div className="eventsDetailsBottomCard">
          <div className="eventsDetailsBottomCardHeadText">
            <span>{t?.eventsPageOtherEvents || "Other Events"}</span>
          </div>
          <div className="row">
            {otherEvents.splice(0,3).map((event) => (
              <div key={event.id} className="xl-4 lg-4 md-6 sm-12">
                <div className="ourEvent">
                  <Link
                    href={`/events/${event?.title
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}-${event.id}`}
                  >
                    <div className="eventCard">
                      <div className="eventCardImage">
                        {event.image && (
                          <Image
                            src={`https://admin.adentta.az/storage${event.image}`}
                            alt={event.title}
                            width={400}
                            height={400}
                          />
                        )}
                        <div className="eventCardImageDate">
                          <span className="eventCardDate">
                            {formatDate(event.event_start_date)}
                          </span>
                          <span className="eventCardDateStatus">
                            <Image
                              src="/icons/eventCardTimeICN.svg"
                              alt="time"
                              width={16}
                              height={16}
                            />
                            {event.event_status == 2
                              ? t?.finished || "finished"
                              : event.event_status == 1
                              ? t?.expedted || "expedted"
                              : event.event_status == 0
                              ? t?.ongoing || "ongoing"
                              : event.event_status}
                          </span>
                        </div>
                      </div>

                      <div className="eventCardContent">
                        <span>{event.title}</span>
                        <p>{event.sub_title}</p>
                      </div>
                      <div className="eventCardLine"></div>

                      <div className="eventCardBottom">
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

export default EventsDetailPage;
