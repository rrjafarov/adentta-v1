import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderMenu from "./HeaderMenu";
import axiosInstance from "@/lib/axios";

async function getTranslations() {
  try {
    const data = axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}

const Header = async ({categoryDropData, categoryData ,isHomePage  }) => {
  const translations = await getTranslations();
  const t = translations?.data;

  return (
    <div>
      <HeaderTop t={t} />
      <HeaderMenu isHomePage={isHomePage} categoryData={categoryData} t={t} />
    </div>
  );
};

export default Header;
