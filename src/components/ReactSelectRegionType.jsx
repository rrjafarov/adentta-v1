  import dynamic from "next/dynamic";
import { useState } from "react";

// react-select'i dinamik olarak, SSR olmadan import ediyoruz
const Select = dynamic(() => import("react-select"), { ssr: false });

const options = [
  { value: "option1", label: "By region" },
  { value: "option2", label: "Saatli" },
  { value: "option3", label: "Baku" },
];

export default function CustomSelect() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#d7e0ed",
      borderRadius: "1rem",
      boxShadow: "none",
      cursor: "pointer",
      // width: "15.0668rem",
      width: "100%",
      height: "4.2921rem",
      color: "#293881",
      //   "&:hover": {
      //     borderColor: "#293881",
      //   },
    }),

    // option styles
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
        fontSize: "1.8rem", // Mobilde daha küçük font
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#293881", // Örnek: kırmızı renk
      fontSize: "1.5rem", // Örnek: 16px font boyutu
    }),
    singleValue: (base) => ({
      ...base,
      color: "#293881", // Seçili değerin rengini belirliyoruz
      fontSize: "1.75rem", // Font boyutunu ayarlıyoruz
      fontWeight: "500", // Font kalınlığını artırıyoruz
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#293881",
      // fontSize: "12px", // Okun rengi burada ayarlanıyor
      transform: "scale(0.85)",
      strokeWidth: "1",
      "&:hover": {
        color: "#1d2b53", // Hover olduğunda farklı renk yapmak istersen
      },
    }),
  };

  // Dropdown ok ve ayırıcıyı kaldırmak için özel bileşenler
  const customComponents = {
    // DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  };

  return (
    <div className="selectProductSort">
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles}
        components={customComponents}
        placeholder="From A-Z"
        isSearchable={false}
      />
    </div>
  );
}
