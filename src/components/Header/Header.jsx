// import React from "react";
// import HeaderTop from "./HeaderTop";
// import HeaderMenu from "./HeaderMenu";

// const Header =  ({t,categoryDropData, categoryData ,isHomePage ,settingData }) => {
 

//   return (
//     <div>
//       <HeaderTop settingData={settingData} t={t} />
//       <HeaderMenu isHomePage={isHomePage} categoryData={categoryData} t={t} />
//     </div>
//   );
// };

// export default Header;








"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HeaderTop from "./HeaderTop";
import HeaderMenu from "./HeaderMenu";

const Header = ({ t, categoryDropData, categoryData, isHomePage, settingData }) => {
  const pathname = usePathname();

  // Dil prefiksini çıxarırıq (/az, /en, /ru)
  const cleanedPath = pathname.replace(/^\/(az|en|ru)/, "");

  // Gray və dynamic route-lar üçün səhifələr
  const grayRoutes = ["/privacy", "/faq", "/support", "/mission", "/contact"];

  // Default background ağ
  let backgroundColor = "#ffffff";

  // Gray səhifələr
  if (grayRoutes.includes(cleanedPath)) {
    backgroundColor = "#F3F7FC";
  }

  // Products
  else if (cleanedPath.startsWith("/products/") && cleanedPath !== "/products") {
    backgroundColor = "#F3F7FC";
  }

  // Blogs
  else if (cleanedPath.startsWith("/blogs/") && cleanedPath !== "/blogs") {
    backgroundColor = "#FAFAFA";
  }

  // Brands
  else if (cleanedPath.startsWith("/brands/") && cleanedPath !== "/brands") {
    backgroundColor = "#F3F7FC";
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <HeaderTop settingData={settingData} t={t} />
      <HeaderMenu
        isHomePage={isHomePage}
        categoryData={categoryData}
        t={t}
      />
    </div>
  );
};

export default Header;


















// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";
// import HeaderTop from "./HeaderTop";
// import HeaderMenu from "./HeaderMenu";

// const Header = ({ t, categoryDropData, categoryData, isHomePage, settingData }) => {
//   const pathname = usePathname();

//   // 👇 Dil prefiksini çıxarırıq (/az, /en, /ru)
//   const cleanedPath = pathname.replace(/^\/(az|en|ru)/, "");

//   // Boz (sənin verdiyin #F3F7FC) olmalı səhifələr və product dynamic route
//   const grayRoutes = ["/privacy", "/faq", "/support", "/mission","/contact", "/products"];

//   // startsWith dynamic route üçün, amma tam /products ağ qalacaq
//   const isGrayPage = grayRoutes.some((route) => cleanedPath.startsWith(route)) && cleanedPath !== "/products";

//   return (
//     <div
//       style={{
//         backgroundColor: isGrayPage ? "#F3F7FC" : "#ffffff", // ✅ sənin verdiyin rəng
//       }}
//     >
//       <HeaderTop settingData={settingData} t={t} />
//       <HeaderMenu
//         isHomePage={isHomePage}
//         categoryData={categoryData}
//         t={t}
//       />
//     </div>
//   );
// };

// export default Header;
