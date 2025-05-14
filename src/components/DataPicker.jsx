
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import ReactSelectStatus from "./ReactSelectStatus";

// export default function DatePicker({ eventsData, onFilterChange, t }) {
//   const [date, setDate] = useState(new Date());
//   const [isOpen, setIsOpen] = useState(false);
//   const wrapperRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [wrapperRef]);

//   const isToday = (someDate) => {
//     const today = new Date();
//     return someDate.toDateString() === today.toDateString();
//   };

//   const displayText = isToday(date) ? (t?.today || "today") : date.toLocaleDateString();

//   const toggleCalendar = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const onDateChange = (selectedDate) => {
//     setDate(selectedDate);
//     setIsOpen(false);
//     // seçilen tarihi parent’a iletir
//     onFilterChange({ date: selectedDate });
//   };

//   const handleStatusChange = (status) => {
//     onFilterChange({ status });
//   };

//   return (
//     <div className="flex gap-4">
//       <div className="datePickerWrapper relative" ref={wrapperRef}>
//         <div className="displayBox cursor-pointer" onClick={toggleCalendar}>
//           <img src="/icons/date.svg" className="icon" alt="calendar icon" />
//           <span className="text text-lg">{t?.selectDate || "Select date"}: {displayText}</span>
//           <img src="/icons/blueBottomArrow.svg" className="icon" alt="arrow icon" />
//         </div>
//         {isOpen && (
//           <div
//             className="calendarContainer absolute z-10 bg-white shadow-md text-lg"
//             style={{
//               top: "calc(100% + 5px)",
//               left: 0,
//               fontSize: "1.5rem",
//               width: "250px",
//             }}
//           >
//             <Calendar
//               onChange={onDateChange}
//               value={date}
//               // locale="en" 
//               locale={t?.locale || "en"}
//               nextLabel={
//                 <img
//                   src="/icons/blueBottomArrow.svg"
//                   className="icon"
//                   style={{ margin: "0 auto" }}
//                   alt="next"
//                 />
//               }
//               prevLabel={
//                 <img
//                   src="/icons/blueBottomArrow.svg"
//                   className="icon"
//                   style={{ transform: "rotate(180deg)", margin: "0 auto" }}
//                   alt="prev"
//                 />
//               }
//             />
//           </div>
//         )}
//       </div>
//       <div className="selectStatus">
//         <ReactSelectStatus t={t} eventsData={eventsData} onStatusChange={handleStatusChange} />
//       </div>
//     </div>
//   );
// }













// !
"use client";
import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactSelectStatus from "./ReactSelectStatus";

export default function DatePicker({ eventsData, onFilterChange, t }) {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const isToday = (someDate) => {
    const today = new Date();
    return someDate.toDateString() === today.toDateString();
  };

  // Azərbaycan aylarının qısa formaları
  const azMonths = {
    1: "yanvar",
    2: "fevral",
    3: "mart",
    4: "aprel",
    5: "may",
    6: "iyun",
    7: "iyul",
    8: "avqust",
    9: "sentyabr",
    10: "oktyabr",
    11: "noyabr",
    12: "dekabr",
  };

  // Həftə günlərinin qısa adları Azərbaycan dilində
  const weekdaysAz = ["B.e.", "Ç.a.", "Çər.", "Cüm.", "C.a.", "Şə.", "Baz."];

  // Cari locale (t.locale varsa, yoxsa default "az")
  const locale = t?.locale || "az";

  // Ekranda göstəriləcək mətn
  const displayText = isToday(date)
    ? (t?.today || "today")
    : (() => {
        if (locale === "az") {
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, "0");
          const month = azMonths[d.getMonth() + 1];
          const year = d.getFullYear();
          return `${day} ${month} ${year}`;
        } else {
          return date.toLocaleDateString(locale);
        }
      })();

  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  const onDateChange = (selectedDate) => {
    setDate(selectedDate);
    setIsOpen(false);
    onFilterChange({ date: selectedDate });
  };

  const handleStatusChange = (status) => {
    onFilterChange({ status });
  };

  return (
    <div className="flex gap-4">
      <div className="datePickerWrapper relative" ref={wrapperRef}>
        <div className="displayBox cursor-pointer" onClick={toggleCalendar}>
          <img src="/icons/date.svg" className="icon" alt="calendar icon" />
          <span className="text text-lg">
            {t?.selectDate || "Select date"}: {displayText}
          </span>
          <img
            src="/icons/blueBottomArrow.svg"
            className="icon"
            alt="arrow icon"
          />
        </div>
        {isOpen && (
          <div
            className="calendarContainer absolute z-10 bg-white shadow-md text-lg"
            style={{
              top: "calc(100% + 5px)",
              left: 0,
              fontSize: "1.5rem",
              width: "250px",
            }}
          >
            <Calendar
              onChange={onDateChange}
              value={date}
              locale={locale}
              // Header: iki sətrdə il və ay adı
              formatMonthYear={(locale, date) => (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span>{date.getFullYear()}</span>
                  <span>{azMonths[date.getMonth() + 1]}</span>
                </div>
              )}
              // Həftə günləri Azərbaycan qısaltmaları
              formatShortWeekday={(locale, date) => weekdaysAz[date.getDay()]}
              nextLabel={
                <img
                  src="/icons/blueBottomArrow.svg"
                  className="icon"
                  style={{ margin: "0 auto" }}
                  alt="next"
                />
              }
              prevLabel={
                <img
                  src="/icons/blueBottomArrow.svg"
                  className="icon"
                  style={{ transform: "rotate(180deg)", margin: "0 auto" }}
                  alt="prev"
                />
              }
            />
          </div>
        )}
      </div>
      <div className="selectStatus">
        <ReactSelectStatus
          t={t}
          eventsData={eventsData}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}
// !