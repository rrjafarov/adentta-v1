
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import axiosInstance from "@/lib/axios";

// const Select = dynamic(() => import("react-select"), { ssr: false });

// async function fetchDoctorCategories() {
//   try {
//     const { data } = await axiosInstance.get(`/page-data/doctor-categories`, {
//       cache: "no-store",
//     });
//     return data.data.data; // API strukturuna uyğun olaraq dəyişin
//   } catch (error) {
//     console.error("Məlumatlar alınmadı:", error);
//     throw error;
//   }
// }

// export default function CustomSelect({ onChange }) {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [doctorCategories, setDoctorCategories] = useState([]);

//   useEffect(() => {
//     async function loadDoctorCategories() {
//       try {
//         const categories = await fetchDoctorCategories();
//         const formatted = categories.map((category) => ({
//           value: category.id,
//           label: category.title,
//         }));
//         setDoctorCategories(formatted);
//       } catch (error) {
//         console.error("Kateqoriyalar yüklənmədi:", error);
//       }
//     }

//     loadDoctorCategories();
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
//         onChange={(value) => {
//           setSelectedOption(value);
//           onChange && onChange(value); // Valideynə ötür
//         }}
//         options={doctorCategories}
//         styles={customStyles}
//         components={customComponents}
//         placeholder="Kateqoriya seçin"
//         isSearchable={false}
//       />
//     </div>
//   );
// }



// !
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const Select = dynamic(() => import("react-select"), { ssr: false });

// ✅ Fetch function for doctor categories
async function fetchDoctorCategories() {
  try {
    const { data } = await axiosInstance.get(`/page-data/doctor-categories`, {
      cache: "no-store", // Cache disabled for fresh data
    });
    return data.data.data; // Return categories data as per API structure
  } catch (error) {
    console.error("Məlumatlar alınmadı:", error);
    throw error;
  }
}

export default function CustomSelect({ onChange, t }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [doctorCategories, setDoctorCategories] = useState([]);

  // ✅ Fetch doctor categories on component mount
  useEffect(() => {
    async function loadDoctorCategories() {
      try {
        const categories = await fetchDoctorCategories();
        const formatted = categories.map((category) => ({
          value: category.id,
          label: category.title,
        }));

        // ✅ Add "All" option to the beginning
        setDoctorCategories([
          { value: null, label: t?.allSelect || "All" },
          ...formatted,
        ]);
      } catch (error) {
        console.error("Kateqoriyalar yüklənmədi:", error);
      }
    }

    loadDoctorCategories();
  }, [t]);

  // ✅ Handle the change of selected category
  const handleChange = (selectedValue) => {
    setSelectedOption(selectedValue);

    // ✅ If "All" is selected, send null to parent component to load all products
    if (selectedValue?.value === null) {
      onChange(null); // "All" selected, load all categories
    } else {
      onChange(selectedValue); // Send selected category to parent
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

  return (
    <div className="selectProductSort">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={doctorCategories}
        styles={customStyles}
        components={customComponents}
        placeholder={t?.selectCategory || "Kateqoriya seçin"}
        isSearchable={false}
      />
    </div>
  );
}

// !
