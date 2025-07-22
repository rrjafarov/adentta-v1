// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import axiosInstance from "@/lib/axios";
// const Select = dynamic(() => import("react-select"), { ssr: false });

// async function fetchProductsPageData() {
//   try {
//     const { data } = await axiosInstance.get(`/page-data/countries`, {
//       cache: "no-store",
//     });
//     return data.data.data; // API strukturuna uyğun olaraq dəyişin
//   } catch (error) {
//     console.error("Məlumatlar alınmadı:", error);
//     throw error;
//   }
// }

// export default function CustomSelect() {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [countryOptions, setCountryOptions] = useState([]);

//   useEffect(() => {
//     async function loadCountries() {
//       try {
//         const countries = await fetchProductsPageData();
//         const formatted = countries.map((country) => ({
//           value: country.id,
//           label: country.title,
//         }));
//         setCountryOptions(formatted);
//       } catch (error) {
//         console.error("Ölkələr yüklənmədi:", error);
//       }
//     }

//     loadCountries();
//   }, []);

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       borderColor: "#d7e0ed",
//       borderRadius: "1rem",
//       boxShadow: "none",
//       cursor: "pointer",
//       fontSize: "1.5rem",
//       width: "100%",
//       height: "4.2921rem",
//       color: "#293881",
//       fontWeight: "500",
//     }),
//     menu: (base) => ({
//       ...base,
//       borderRadius: "12px",
//       border: "1px solid #E6E9EF",
//       color: "#293881",
//       fontSize: "1.5rem",
//       fontWeight: "500",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused ? "#FFF" : "#FFFFFF",
//       color: "#293881",
//       cursor: "pointer",
//       fontSize: "1.5rem",
//       borderRadius: "15px",
//       "@media (max-width: 768px)": {
//         fontSize: "1.8rem",
//       },
//     }),
//     placeholder: (base) => ({
//       ...base,
//       color: "#293881",
//       fontSize: "1.8rem",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: "#293881",
//       fontSize: "1.8rem",
//       fontWeight: "500",
//     }),
//     dropdownIndicator: (base) => ({
//       ...base,
//       color: "#293881",
//       transform: "scale(0.85)",
//       strokeWidth: "1",
//       "&:hover": {
//         color: "#1d2b53",
//       },
//     }),
//   };

//   const customComponents = {
//     IndicatorSeparator: () => null,
//   };

//   return (
//     <div className="selectProductSort">
//       <Select
//         value={selectedOption}
//         onChange={setSelectedOption}
//         options={countryOptions}
//         styles={customStyles}
//         components={customComponents}
//         placeholder="Ölkə seçin"
//         isSearchable={false}
//       />
//     </div>
//   );
// }








// !son versiya
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import axiosInstance from "@/lib/axios";
// const Select = dynamic(() => import("react-select"), { ssr: false });

// // ✅ Props-a onChange əlavə etdik
// export default function CustomSelect({ onChange }) {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [countryOptions, setCountryOptions] = useState([]);

//   useEffect(() => {
//     async function loadCountries() {
//       try {
//         const countries = await fetchProductsPageData();
//         const formatted = countries.map((country) => ({
//           value: country.id,
//           label: country.title,
//         }));
//         setCountryOptions(formatted);
//       } catch (error) {
//         console.error("Ölkələr yüklənmədi:", error);
//       }
//     }

//     loadCountries();
//   }, []);

//   const handleChange = (value) => {
//     setSelectedOption(value);
//     if (onChange) onChange(value); // ✅ Valideynə ötür
//   };

//   return (
//     <div className="selectProductSort">
//       <Select
//         value={selectedOption}
//         onChange={handleChange} // ✅ Burada dəyişiklik etdik
//         options={countryOptions}
//         styles={customStyles}
//         components={customComponents}
//         placeholder="Ölkə seçin"
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
//     width: "100%",
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
//     fontWeight: "500",
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isFocused ? "#FFF" : "#FFFFFF",
//     color: "#293881",
//     cursor: "pointer",
//     fontSize: "1.5rem",
//     borderRadius: "15px",
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

// // ✅ API üçün
// async function fetchProductsPageData() {
//   try {
//     const { data } = await axiosInstance.get(`/page-data/countries`, {
//       cache: "no-store",
//     });
//     return data.data.data;
//   } catch (error) {
//     console.error("Məlumatlar alınmadı:", error);
//     throw error;
//   }
// }

// !son versiya















import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
const Select = dynamic(() => import("react-select"), { ssr: false });

// ✅ Props-a onChange əlavə etdik
export default function CustomSelect({ onChange, t }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);

  // ✅ useEffect ile t'yi kullanarak verileri yüklerken All (Hamısı) seçeneğini ekle
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
  }, [t]); // t değiştiğinde yeniden çalışır

  const handleChange = (value) => {
    setSelectedOption(value);

    // ✅ "All" üçün yoxlama
    if (value?.value === null) {
      onChange(null); // "All" seçiləndə null göndəririk
    } else {
      onChange(value);
    }
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

// ✅ Əlavə olundu: "All" (Hamısı) seçimi siyahının əvvəlinə əlavə edilir
async function fetchProductsPageData(t) {
  try {
    const { data } = await axiosInstance.get(`/page-data/countries?per_page=999`, {
      cache: "no-store",
    });

    const formatted = data.data.data.map((country) => ({
      value: country.id,
      label: country.title,
    }));

    // "All" seçeneğini ekle
    return [{ value: null, label: `${t?.allSelect || "All"}` }, ...formatted];
  } catch (error) {
    console.error("Məlumatlar alınmadı:", error);
    throw error;
  }
}



