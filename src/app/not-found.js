import "../components/Footer/footer.scss";
import "../components/Header/header.scss";
import React from "react";
import "./[locale]/globals.scss";
import NotFound from "@/components/NotFound";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function getTranslations (){
  try {
    const data = axiosInstance.get("/translation-list")
    return data;
  }catch(err){
    console.log(err)
  }
}


const notfound = async () => {
  const translations = await getTranslations()
  const t = translations?.data

  return (
    <html>
      <body>
        <NotFound t={t} />
      </body>
    </html>
  );
};

export default notfound;
