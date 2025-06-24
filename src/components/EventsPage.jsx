"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import DataPicker from "@/components/DataPicker";
import Cookies from "js-cookie";

const itemsPerPage = 9;

const EventsPage = ({ eventsData, t }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  // eventsData strukturunu yoxlamaq üçün
  useEffect(() => {
    console.log("eventsData:", eventsData);
    console.log(
      "event_status dəyərləri:",
      eventsData.map((event) => event.event_status)
    );
  }, [eventsData]);

  // Filter funksiyası
  const handleFilterChange = ({ status, date }) => {
    console.log("Seçilən status:", status);
    console.log("Seçilən tarix:", date);
    let filtered = eventsData;

    // önce status filtrele
    if (status && status !== "all") {
      filtered = filtered.filter((event) => {
        const statusMap = {
          ongoing: [0, "ongoing", "0"],
          expected: [1, "expected", "1"],
          finished: [2, "finished", "2"],
        };
        return statusMap[status].includes(event.event_status);
      });
    }

    // ardından tarih filtrele
    if (date) {
      const sel = new Date(date).toDateString();
      filtered = filtered.filter(
        (event) => new Date(event.event_start_date).toDateString() === sel
      );
    }

    console.log("Filterlənmiş eventlər:", filtered);
    setFilteredEvents(filtered);
    setCurrentPage(0);
  };

  // Səhifə sayı
  const pageCount = Math.ceil(filteredEvents.length / itemsPerPage);

  // Göstəriləcək eventlər
  const displayedEvents = filteredEvents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Səhifə dəyişmə
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const lang = Cookies.get("NEXT_LOCALE") || "az";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    let month;
    if (lang === "az") {
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

  const formatStatus = (status) => {
    if (status === 0 || status === "ongoing" || status === "0")
      return t?.ongoing || "ongoing";
    if (status === 1 || status === "expected" || status === "1")
      return t?.expected || "expected";
    if (status === 2 || status === "finished" || status === "2")
      return t?.finished || "finished";
    return status;
  };

  return (
    <>
      <div className="container">
        <div className="eventTop topper">
          <Link href="/">
            <h1>Adentta</h1>
          </Link>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <h4>{t?.events || "Events"}</h4>
        </div>
      </div>

      <div className="eventPage">
        <div className="container">
          <div className="eventPageHead flex justify-between items-center">
            <div className="eventPageHeaderText">
              <h2>{t?.events || "Events"}</h2>
              <span>{t?.eventsPageExploreOurEvents || "Events"}</span>
              <p>{t?.eventsPageSubText || "Events"}</p>
            </div>
            <DataPicker
              t={t}
              eventsData={eventsData}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="eventsCards">
            {filteredEvents.length === 0 ? (
              <p>No events were found.</p>
            ) : (
              <div className="row">
                {displayedEvents.map((event) => (
                  <div key={event.id} className="xl-4 lg-4 md-6 sm-12">
                    <div className="ourEvent">
                      <Link
                        // href={`/events/${event?.title?.toLowerCase()
                        //   .replace(/\s+/g, "-")}-${event.id}`}
                        href={`/events/${(event?.slug || event?.title)
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")}-${event.id}`}
                      >
                        <div className="eventCard">
                          <div className="eventCardImage">
                            {event.image && (
                              <Image
                                src={`https://admin.adentta.az/storage${event.image}`}
                                alt={event.title}
                                width={300}
                                height={300}
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
                                {formatStatus(event.event_status)}
                              </span>
                            </div>
                          </div>
                          <div className="eventCardContent">
                            <span>{event.title}</span>
                            <p>{event.sub_title}</p>
                          </div>
                          <div className="eventCardBottom">
                            <span>{t?.learnMore || "Learn More"}</span>
                            <img src="/icons/arrowTopRight.svg" alt="arrow" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {pageCount > 1 && (
            <div className="eventsPaginate">
              <ReactPaginate
                previousLabel={t?.paginatePrev || "Previous"}
                nextLabel={t?.paginateNext || "Next"}
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item-pervious"
                previousLinkClassName="page-link-pervious"
                nextClassName="page-item-next"
                nextLinkClassName="page-link-next"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
