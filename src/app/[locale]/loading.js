// "use client"
// import React, { useEffect, useState } from "react";

// const Loading = () => {
//   const [progress, setProgress] = useState(0);
//   const [loadingDone, setLoadingDone] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 95) {
//           clearInterval(interval);
//           // Simulyasiya üçün 1 saniyə sonra yükləmə bitsin
//           setTimeout(() => {
//             setProgress(100);
//             setTimeout(() => setLoadingDone(true), 150);
//           }, 100);
//         }
//         return prev + 1;
//       });
//     }, 10); // sürəti istəyə görə dəyiş

//     return () => clearInterval(interval);
//   }, []);

//   if (loadingDone) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         height: "5px",
//         width: "100%",
//         zIndex: 9999,
//         backgroundColor: "#98B4DE",
//         borderRadius: "1rem",
//       }}
//     >
//       <div
//         style={{
//           height: "100%",
//           width: `${progress}%`,
//           backgroundColor: "#293881",
//           transition: "width 0.3s ease",
//           borderRadius: "1rem",
//         }}
//       />
//     </div>
//   );
// };

// export default Loading;





// app/loading.js - Next.js App Router avtomatik istifadə edəcək
"use client"
import React, { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setProgress(100);
          }, 100);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        // position: "fixed",
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // backgroundColor: "white",
        // zIndex: 9999,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        height: "5px",
        width: "100%",
        zIndex: 9999,
        backgroundColor: "#98B4DE",
        borderRadius: "1rem",
      }}
    >
      <div
        style={{
          // width: "300px",
          height: "6px",
          backgroundColor: "#98B4DE",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            // height: "100%",
            // width: `${progress}%`,
            // backgroundColor: "#293881",
            // transition: "width 0.3s ease",
            // borderRadius: "1rem",

            height: "100%",
          width: `${progress}%`,
          backgroundColor: "#293881",
          transition: "width 0.3s ease",
          borderRadius: "1rem",
          }}
        />
      </div>
    </div>
  );
}