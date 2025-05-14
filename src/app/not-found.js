import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
// import "./[locale]/globals.scss";
// import "../app/[locale]/globals.scss";
import "../components/Footer/footer.scss";
import "../components/Header/header.scss";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./[locale]/globals.scss";
import NotFound from "@/components/NotFound";

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
