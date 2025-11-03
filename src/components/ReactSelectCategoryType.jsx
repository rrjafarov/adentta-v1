// !

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const Select = dynamic(() => import("react-select"), { ssr: false });

// API'den kategori verilerini çekiyoruz
async function fetchBrandCategories(t) {
  try {
    const { data } = await axiosInstance.get(
      `/page-data/brand-categories?per_page=999`,
      {
        cache: "no-store",
      }
    );
    const formatted = data.data.data.map((cat) => ({
      value: cat.id,
      label: cat.title, // Əgər title_az və s. varsa, dəyişdir
    }));

    // "All" seçeneğini ekliyoruz
    return [{ value: null, label: `${t?.allSelect || "All"}` }, ...formatted];
  } catch (error) {
    console.error("Brend kateqoriyalar alınmadı:", error);
    throw error;
  }
}

export default function BrandCategorySelect({ onChange, t }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await fetchBrandCategories(t);
        setOptions(categories);
      } catch (error) {
        console.error("Yükləmə zamanı xəta:", error);
      }
    }

    loadCategories();
  }, [t]); // t dəyişdiğinde yeniden çalışır

  const handleChange = (selected) => {
    setSelectedOption(selected); // Seçimi lokal state-ə yazırıq

    // "All" seçildiyində null göndəririk
    if (selected?.value === null) {
      onChange(null); // "All" seçiləndə null göndəririk
    } else {
      onChange(selected); // Seçimi valideyn komponentinə ötürürük
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#d7e0ed",
      borderRadius: "1rem",
      boxShadow: "none",
      cursor: "pointer",
      fontSize: "1.5rem",
      // width: "100%",
      width: "18rem",

      height: "4.2921rem",
      color: "#293881",
      fontWeight: "500",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "12px",
      border: "1px solid #E6E9EF",
      color: "#293881",
      fontSize: "1.5rem",
      width: "18rem",

      fontWeight: "500",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#FFF" : "#FFFFFF",
      color: "#293881",
      cursor: "pointer",
      fontSize: "1.5rem",
      borderRadius: "15px",
      width: "100%",

      "@media (max-width: 768px)": {
        fontSize: "1.8rem",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#293881",
      fontSize: "1.8rem",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#293881",
      fontSize: "1.8rem",
      fontWeight: "500",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#293881",
      transform: "scale(0.85)",
      strokeWidth: "1",
      "&:hover": {
        color: "#1d2b53",
      },
    }),
  };

  const customComponents = {
    IndicatorSeparator: () => null,
  };

  return (
    <div className="selectProductSort">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        components={customComponents}
        placeholder={t?.selectCategory || "Kategoriya seçin"}
        isSearchable={false}
      />
    </div>
  );
}

// !
