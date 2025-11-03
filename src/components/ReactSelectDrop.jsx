// !
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const Select = dynamic(() => import("react-select"), { ssr: false });

// ✅ Fetch function for brand categories
async function fetchBrandCategories() {
  try {
    const { data } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
      cache: "no-store", // Cache disabled for fresh data
    });
    return data.data.data; // Return brand data as per API structure
  } catch (error) {
    console.error("Məlumatlar alınmadı:", error);
    throw error;
  }
}

export default function CustomSelect({ onChange, t }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [brandCategories, setBrandCategories] = useState([]);

  // ✅ Fetch brand categories on component mount
  useEffect(() => {
    async function loadBrandCategories() {
      try {
        const categories = await fetchBrandCategories();
        const formatted = categories.map((category) => ({
          value: category.id,
          label: category.title,
        }));

        // ✅ Add "All" option to the beginning
        setBrandCategories([
          { value: null, label: t?.allSelect || "All" }, // "All" seçeneği ekliyoruz
          ...formatted,
        ]);
      } catch (error) {
        console.error("Kateqoriyalar yüklənmədi:", error);
      }
    }

    loadBrandCategories();
  }, [t]); // 't' dəyişdikdə yenidən yükləmək üçün

  // ✅ Custom styles for react-select
  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#d7e0ed",
      borderRadius: "1rem",
      boxShadow: "none",
      cursor: "pointer",
      fontSize: "1.5rem",
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
      fontWeight: "500",
      width: "18rem",

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
        fontSize: "1.8rem", // Mobilde daha küçük font
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

  // ✅ onChange fonksiyonu
  const handleSelectChange = (selectedValue) => {
    setSelectedOption(selectedValue); // Seçilen değeri state'e kaydet

    // "All" seçilirse null göndərərək bütün markaları yükləyin
    if (selectedValue?.value === null) {
      onChange(null); // "All" seçildikdə null göndəririk
    } else {
      onChange(selectedValue); // Seçilen markayı göndəririk
    }

    console.log("Seçilen Marka:", selectedValue); // Seçilen marka bilgisi
  };

  return (
    <div className="selectProductSort">
      <Select
        value={selectedOption}
        onChange={handleSelectChange} // onChange'yi tetiklediğimiz yer
        options={brandCategories}
        styles={customStyles}
        components={customComponents}
        placeholder={t?.selectBrand || "Brand seçin"} // Placeholder olarak görünecek
        isSearchable={false}
      />
    </div>
  );
}
