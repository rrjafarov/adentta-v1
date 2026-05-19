
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import ReactPaginate from "react-paginate";
// import DataPicker from "@/components/DataPicker";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// const EventsPage = ({ eventsData, t, currentPage = 1, totalPages = 1 }) => {
//   const [filteredEvents, setFilteredEvents] = useState(eventsData);
//   const [loading, setLoading] = useState(false);
//   const cardsRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     console.log("eventsData:", eventsData);
//     console.log(
//       "event_status dəyərləri:",
//       eventsData.map((event) => event.event_status)
//     );
//   }, [eventsData]);

//   useEffect(() => {
//     setFilteredEvents(eventsData);
//     setLoading(false);
//   }, [eventsData]);

//   const handleFilterChange = ({ status, date }) => {
//     console.log("Seçilən status:", status);
//     console.log("Seçilən tarix:", date);
//     let filtered = eventsData;

//     if (status && status !== "all") {
//       filtered = filtered.filter((event) => {
//         const statusMap = {
//           ongoing: [0, "ongoing", "0"],
//           expected: [1, "expected", "1"],
//           finished: [2, "finished", "2"],
//         };
//         return statusMap[status].includes(event.event_status);
//       });
//     }

//     if (date) {
//       const sel = new Date(date).toDateString();
//       filtered = filtered.filter(
//         (event) => new Date(event.event_start_date).toDateString() === sel
//       );
//     }

//     console.log("Filterlənmiş eventlər:", filtered);
//     setFilteredEvents(filtered);
//   };

//   const handlePageClick = (event) => {
//     const selectedPage = event.selected + 1;

//     setLoading(true);
//     router.push(`/events?page=${selectedPage}`);

//     setTimeout(() => {
//       if (cardsRef.current) {
//         cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     }, 300);
//   };

//   const lang = Cookies.get("NEXT_LOCALE") || "az";

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate().toString().padStart(2, "0");
//     const year = date.getFullYear();

//     let month;
//     if (lang === "az") {
//       const azMonths = {
//         1: "yan",
//         2: "fev",
//         3: "mar",
//         4: "apr",
//         5: "may",
//         6: "iyn",
//         7: "iyl",
//         8: "avq",
//         9: "sen",
//         10: "okt",
//         11: "noy",
//         12: "dek",
//       };
//       month = azMonths[date.getMonth() + 1];
//     } else {
//       month = new Intl.DateTimeFormat(lang, { month: "short" })
//         .format(date)
//         .replace(".", "");
//     }

//     return `${day} ${month} ${year}`;
//   };

//   const formatStatus = (status) => {
//     if (status === 0 || status === "ongoing" || status === "0")
//       return t?.ongoing || "ongoing";
//     if (status === 1 || status === "expected" || status === "1")
//       return t?.expected || "expected";
//     if (status === 2 || status === "finished" || status === "2")
//       return t?.finished || "finished";
//     return status;
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .eventsCards .row {
//           animation: fadeIn 0.4s ease;
//         }
//       `}</style>

//       <div className="container">
//         <div className="eventTop topper">
//           <Link href="/">
//             <strong>Adentta</strong>
//           </Link>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span>{t?.events || "Events"}</span>
//         </div>
//       </div>

//       <div className="eventPage">
//         <div className="container">
//           <div className="eventPageHead flex justify-between items-center">
//             <div className="eventPageHeaderText">
//               <span>{t?.events || "Events"}</span>
//               <h2>{t?.eventsPageExploreOurEvents || "Events"}</h2>
//               <p>{t?.eventsPageSubText || "Events"}</p>
//             </div>
//             <DataPicker
//               t={t}
//               eventsData={eventsData}
//               onFilterChange={handleFilterChange}
//             />
//           </div>

//           <div className="eventsCards" ref={cardsRef}>
//             {loading ? (
//               <div style={{ display: "flex", justifyContent: "center", margin: "80px 0" }}>
//                 <div
//                   style={{
//                     width: 50,
//                     height: 50,
//                     border: "6px solid #f3f3f3",
//                     borderTop: "6px solid #293881",
//                     borderRadius: "50%",
//                     animation: "spin 1s linear infinite",
//                   }}
//                 />
//               </div>
//             ) : filteredEvents.length === 0 ? (
//               <p className="eventNotFound">{t?.eventNotFound}</p>
//             ) : (
//               <div className="row">
//                 {filteredEvents.map((event) => (
//                   <div key={event.id} className="xl-4 lg-4 md-6 sm-12">
//                     <div className="ourEvent">
//                       <Link
//                         href={`/events/${(event?.slug || event?.title)
//                           ?.toLowerCase()
//                           .replace(/\s+/g, "-")}-${event.id}`}
//                       >
//                         <div className="eventCard">
//                           <div className="eventCardImage">
//                             {event.image && (
//                               <Image
//                                 src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${event.image}`}
//                                 alt={event.title}
//                                 width={400}
//                                 height={400}
//                               />
//                             )}
//                             <div className="eventCardImageDate">
//                               <span className="eventCardDate">
//                                 {formatDate(event.event_start_date)}
//                               </span>
//                               <span className="eventCardDateStatus">
//                                 <Image
//                                   src="/icons/eventCardTimeICN.svg"
//                                   alt="time"
//                                   width={16}
//                                   height={16}
//                                 />
//                                 {formatStatus(event.event_status)}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="eventCardContent">
//                             <span>{event.title}</span>
//                             <p>{event.sub_title}</p>
//                           </div>
//                           <div className="eventCardBottom">
//                             <span>{t?.learnMore || "Learn More"}</span>
//                             <img src="/icons/arrowTopRight.svg" alt="arrow" />
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {totalPages > 1 && (
//             <div className="eventsPaginate">
//               <ReactPaginate
//                 previousLabel={t?.paginatePrev || "Previous"}
//                 nextLabel={t?.paginateNext || "Next"}
//                 breakLabel="..."
//                 pageCount={totalPages}
//                 forcePage={currentPage - 1}
//                 marginPagesDisplayed={2}
//                 pageRangeDisplayed={3}
//                 onPageChange={handlePageClick}
//                 containerClassName="pagination"
//                 pageClassName="page-item"
//                 pageLinkClassName="page-link"
//                 previousClassName="page-item-pervious"
//                 previousLinkClassName="page-link-pervious"
//                 nextClassName="page-item-next"
//                 nextLinkClassName="page-link-next"
//                 breakClassName="page-item"
//                 breakLinkClassName="page-link"
//                 activeClassName="active"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default EventsPage;















































"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import DataPicker from "@/components/DataPicker";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const generateSlug = (text = "") => {
  return text
    .toLowerCase()
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const EventsPage = ({ eventsData, t, currentPage = 1, totalPages = 1 }) => {
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [loading, setLoading] = useState(false);
  const cardsRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setFilteredEvents(eventsData);
    setLoading(false);
  }, [eventsData]);

  const handleFilterChange = ({ status, date }) => {
    let filtered = eventsData;

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

    if (date) {
      const sel = new Date(date).toDateString();
      filtered = filtered.filter(
        (event) =>
          new Date(event.event_start_date).toDateString() === sel
      );
    }

    setFilteredEvents(filtered);
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;

    setLoading(true);
    router.push(`/events?page=${selectedPage}`);

    setTimeout(() => {
      if (cardsRef.current) {
        cardsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
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
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .eventsCards .row {
          animation: fadeIn 0.4s ease;
        }
      `}</style>

      <div className="container">
        <div className="eventTop topper">
          <Link href="/">
            <strong>Adentta</strong>
          </Link>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <span>{t?.events || "Events"}</span>
        </div>
      </div>

      <div className="eventPage">
        <div className="container">
          <div className="eventPageHead flex justify-between items-center">
            <div className="eventPageHeaderText">
              <span>{t?.events || "Events"}</span>
              <h2>{t?.eventsPageExploreOurEvents || "Events"}</h2>
              <p>{t?.eventsPageSubText || "Events"}</p>
            </div>

            <DataPicker
              t={t}
              eventsData={eventsData}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="eventsCards" ref={cardsRef}>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", margin: "80px 0" }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    border: "6px solid #f3f3f3",
                    borderTop: "6px solid #293881",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
            ) : filteredEvents.length === 0 ? (
              <p className="eventNotFound">{t?.eventNotFound}</p>
            ) : (
              <div className="row">
                {filteredEvents.map((event) => {
                  const slug = event?.slug || generateSlug(event?.title);

                  return (
                    <div key={event.id} className="xl-4 lg-4 md-6 sm-12">
                      <div className="ourEvent">
                        <Link href={`/events/${slug}-${event.id}`}>
                          <div className="eventCard">
                            <div className="eventCardImage">
                              {event.image && (
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${event.image}`}
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
                  );
                })}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="eventsPaginate">
              <ReactPaginate
                previousLabel={t?.paginatePrev || "Previous"}
                nextLabel={t?.paginateNext || "Next"}
                breakLabel="..."
                pageCount={totalPages}
                forcePage={currentPage - 1}
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