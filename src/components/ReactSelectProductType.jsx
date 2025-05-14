// !

"use client"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const Select = dynamic(() => import("react-select"), { ssr: false });

// ✅ Product kateqoriyalarını çəkən funksiya
async function fetchProductCategories() {
  try {
    const { data } = await axiosInstance.get(`/page-data/product`, {
      cache: "no-store",
    });
    return data.data.data;
  } catch (error) {
    console.error("Məlumatlar alınmadı:", error);
    throw error;
  }
}

export default function CustomProductSelect({ onChange, t }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Komponent mount olanda product kateqoriyalarını yüklə
  useEffect(() => {
    async function loadProductCategories() {
      setLoading(true); // Yükləməyi başlat
      try {
        const categories = await fetchProductCategories();
        const formatted = categories.map((category) => ({
          value: category.id,
          label: category.title,
        }));

        // "All" seçimi əlavə olunur
        setProductCategories([
          { value: null, label: t?.allSelect || "All" },
          ...formatted,
        ]);
      } catch (error) {
        console.error("Kateqoriyalar yüklənmədi:", error);
      } finally {
        setLoading(false); // Yükləməyi bitir
      }
    }

    loadProductCategories();
  }, [t]);

  // ✅ Custom styles
  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#d7e0ed",
      borderRadius: "1rem",
      boxShadow: "none",
      cursor: "pointer",
      fontSize: "1.5rem",
      width: "100%",
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
      fontWeight: "500",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#FFF" : "#FFFFFF",
      color: "#293881",
      cursor: "pointer",
      fontSize: "1.5rem",
      borderRadius: "15px",
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

  // ✅ Seçim dəyişdikdə
  const handleSelectChange = (selectedValue) => {
    setSelectedOption(selectedValue);
    if (selectedValue?.value === null) {
      onChange(null);
    } else {
      onChange(selectedValue);
    }

    console.log("Seçilen Məhsul Kateqoriyası:", selectedValue);
  };

  return (
    <div className="selectProductSort">
      
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          options={productCategories}
          styles={customStyles}
          components={customComponents}
          placeholder={t?.selectProduct || "Məhsul seçin"}
          isSearchable={false}
        />
      
    </div>
  );
}
