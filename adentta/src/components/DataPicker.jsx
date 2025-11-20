// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import ReactSelectStatus from "./ReactSelectStatus";

// const azMonths = {
//   1: "yanvar",
//   2: "fevral",
//   3: "mart",
//   4: "aprel",
//   5: "may",
//   6: "iyun",
//   7: "iyul",
//   8: "avqust",
//   9: "sentyabr",
//   10: "oktyabr",
//   11: "noyabr",
//   12: "dekabr",
// };

// // Azərbaycan həftə günlərinin qısa adları
// const weekdaysAz = ["B.e.", "Ç.a.", "Çər.", "Cüm.", "C.a.", "Şə.", "Baz."];

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

//   const locale = t?.locale || "az";

//   const isToday = (someDate) => {
//     const today = new Date();
//     return someDate.toDateString() === today.toDateString();
//   };

//   // Ekranda göstəriləcək mətn
//   const displayText = isToday(date)
//     ? (t?.today || "today")
//     : (() => {
//         if (locale === "az") {
//           const d = new Date(date);
//           const day = String(d.getDate()).padStart(2, "0");
//           const month = azMonths[d.getMonth() + 1];
//           const year = d.getFullYear();
//           return `${day} ${month} ${year}`;
//         } else {
//           const day = String(date.getDate()).padStart(2, "0");
//           const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
//           const year = date.getFullYear();
//           return `${day} ${month} ${year}`;
//         }
//       })();

//   const toggleCalendar = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const onDateChange = (selectedDate) => {
//     setDate(selectedDate);
//     setIsOpen(false);
//     onFilterChange({ date: selectedDate });
//   };

//   const handleStatusChange = (status) => {
//     onFilterChange({ status });
//   };

//   // Təqvim üçün format funksiyaları
//   const formatMonthYear = (_locale, d) => {  // <-- parametrləri düzəltdim: date parametri adi 'd' olsun
//     if (locale === "AZ") {
//       return (
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <span>{d.getFullYear()}</span>
//           <span>{azMonths[d.getMonth() + 1]}</span>  {/* <-- M05 əvəzinə mapping ilə "may" */}
//         </div>
//       );
//     } else {
//       return (
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <span>{d.getFullYear()}</span>
//           <span>{new Intl.DateTimeFormat(locale, { month: "long" }).format(d)}</span>
//         </div>
//       );
//     }
//   };

//   const formatShortWeekday = (_locale, d) => {  // <-- yenə də date parametri 'd'
//     if (locale === "AZ") {
//       return weekdaysAz[d.getDay()];  // <-- həftə günləri mapping ilə
//     } else {
//       return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d);
//     }
//   };

//   return (
//     <div className="flex gap-4">
//       <div className="datePickerWrapper relative" ref={wrapperRef}>
//         <div className="displayBox cursor-pointer" onClick={toggleCalendar}>
//           <img src="/icons/date.svg" className="icon" alt="calendar icon" />
//           <span className="text text-lg">
//             {t?.selectDate || "Select date"}: {displayText}
//           </span>
//           <img
//             src="/icons/blueBottomArrow.svg"
//             className="icon"
//             alt="arrow icon"
//           />
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
//               locale={locale === "az" ? "az" : locale}  // <-- takılar locale parametri olaraq "az"
//               formatMonthYear={formatMonthYear}
//               formatShortWeekday={formatShortWeekday}
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
//         <ReactSelectStatus
//           t={t}
//           eventsData={eventsData}
//           onStatusChange={handleStatusChange}
//         />
//       </div>
//     </div>
//   );
// }







































"use client";
import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactSelectStatus from "./ReactSelectStatus";

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

// Ayların qısa adları (ilk 3 hərf)
const azMonthsShort = {
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

// Azərbaycan həftə günlərinin qısa adları
const weekdaysAz = ["B.e.", "Ç.a.", "Çər.", "Cüm.", "C.a.", "Şə.", "Baz."];

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

  const locale = t?.locale || "az";

  const isToday = (someDate) => {
    const today = new Date();
    return someDate.toDateString() === today.toDateString();
  };

  // Ekranda göstəriləcək mətn
  const displayText = isToday(date)
    ? (t?.today || "today")
    : (() => {
        if (locale === "az") {
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, "0");
          const month = azMonthsShort[d.getMonth() + 1];
          const year = d.getFullYear();
          return `${day} ${month} ${year}`;
        } else {
          const day = String(date.getDate()).padStart(2, "0");
          const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
          const month = monthName.substring(0, 3);
          const year = date.getFullYear();
          return `${day} ${month} ${year}`;
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

  // Təqvim üçün format funksiyaları
  const formatMonthYear = (_locale, d) => {
    let shortMonth;
    if (locale === "az") {
      shortMonth = azMonthsShort[d.getMonth() + 1];
    } else {
      const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(d);
      shortMonth = monthName.substring(0, 3);
    }
    return `${shortMonth} ${d.getFullYear()}`;
  };

  const formatShortWeekday = (_locale, d) => {
    if (locale === "az") {
      return weekdaysAz[d.getDay()];
    } else {
      return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d);
    }
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
              locale="en-US"
              formatMonthYear={formatMonthYear}
              formatShortWeekday={formatShortWeekday}
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