// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import axiosInstance from "@/lib/axios";
// const Select = dynamic(() => import("react-select"), { ssr: false });

// // ✅ Props-a onChange əlavə etdik
// export default function CustomSelect({ onChange, t }) {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [countryOptions, setCountryOptions] = useState([]);

//   // ✅ useEffect ile t'yi kullanarak verileri yüklerken All (Hamısı) seçeneğini ekle
//   useEffect(() => {
//     async function loadCountries() {
//       try {
//         const countries = await fetchProductsPageData(t);
//         setCountryOptions(countries);
//       } catch (error) {
//         console.error("Ölkələr yüklənmədi:", error);
//       }
//     }

//     loadCountries();
//   }, [t]); // t değiştiğinde yeniden çalışır

//   const handleChange = (value) => {
//     setSelectedOption(value);

//     // ✅ "All" üçün yoxlama
//     if (value?.value === null) {
//       onChange(null); // "All" seçiləndə null göndəririk
//     } else {
//       onChange(value);
//     }
//   };

//   return (
//     <div className="selectProductSort">
//       <Select
//         value={selectedOption}
//         onChange={handleChange}
//         options={countryOptions}
//         styles={customStyles}
//         components={customComponents}
//         placeholder={t?.selectCountry || "Ölkə seçin"}
//         isSearchable={false}
//       />
//     </div>
//   );
// }

// const customStyles = {
//   control: (base) => ({
//     ...base,
//     borderColor: "#d7e0ed",
//     borderRadius: "1rem",
//     boxShadow: "none",
//     cursor: "pointer",
//     fontSize: "1.5rem",
//     width: "18rem",
//     height: "4.2921rem",
//     color: "#293881",
//     fontWeight: "500",
//   }),
//   menu: (base) => ({
//     ...base,
//     borderRadius: "12px",
//     border: "1px solid #E6E9EF",
//     color: "#293881",
//     fontSize: "1.5rem",
//     width: "18rem",
//     fontWeight: "500",
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isFocused ? "#FFF" : "#FFFFFF",
//     color: "#293881",
//     cursor: "pointer",
//     fontSize: "1.5rem",
//     borderRadius: "15px",
//     width:"100%",
//     "@media (max-width: 768px)": {
//       fontSize: "1.8rem",
//     },
//   }),
//   placeholder: (base) => ({
//     ...base,
//     color: "#293881",
//     fontSize: "1.8rem",
//   }),
//   singleValue: (base) => ({
//     ...base,
//     color: "#293881",
//     fontSize: "1.8rem",
//     fontWeight: "500",
//   }),
//   dropdownIndicator: (base) => ({
//     ...base,
//     color: "#293881",
//     transform: "scale(0.85)",
//     strokeWidth: "1",
//     "&:hover": {
//       color: "#1d2b53",
//     },
//   }),
// };

// const customComponents = {
//   IndicatorSeparator: () => null,
// };

// // ✅ Əlavə olundu: "All" (Hamısı) seçimi siyahının əvvəlinə əlavə edilir
// async function fetchProductsPageData(t) {
//   try {
//     const { data } = await axiosInstance.get(`/page-data/countries?per_page=999`, {
//       cache: "no-store",
//     });

//     const formatted = data.data.data.map((country) => ({
//       value: country.id,
//       label: country.title,
//     }));

//     // "All" seçeneğini ekle
//     return [{ value: null, label: `${t?.allSelect || "All"}` }, ...formatted];
//   } catch (error) {
//     throw error;
//   }
// }








// ! son versiya 




import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const Select = dynamic(() => import("react-select"), { ssr: false });

async function fetchProductsPageData(t) {
  try {
    const { data } = await axiosInstance.get(`/page-data/countries?per_page=999`, {
      cache: "no-store",
    });

    // ✅ ID və title-i düzgün şəkildə map edirik
    const formatted = data.data.data.map((country) => ({
      value: country.id, // ID-ni value olaraq göndəririk
      label: country.title, // Title-i label olaraq göndəririk
    }));

    return [{ value: null, label: `${t?.allSelect || "All"}` }, ...formatted];
  } catch (error) {
    throw error;
  }
}

export default function CustomSelect({ onChange, t }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    async function loadCountries() {
      try {
        const countries = await fetchProductsPageData(t);
        setCountryOptions(countries);
      } catch (error) {
        console.error("Ölkələr yüklənmədi:", error);
      }
    }

    loadCountries();
  }, [t]);

  const handleChange = (value) => {
    setSelectedOption(value);

    // ✅ "All" seçildikdə null, digər hallarda seçilmiş obyekti göndəririk
    if (value?.value === null) {
      onChange(null);
    } else {
      onChange(value); // { value: 39, label: "İsveçrə" }
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
      width:"100%",
      "@media (max-width: 768px)": {
        fontSize: "1.8rem",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#293881",
      fontSize: "1.8rem",
      "@media (max-width: 768px)": {
        fontSize: "1.5rem",
      },
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
        options={countryOptions}
        styles={customStyles}
        components={customComponents}
        placeholder={t?.selectCountry || "Ölkə seçin"}
        isSearchable={false}
      />
    </div>
  );
}