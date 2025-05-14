import dynamic from "next/dynamic";
import { useState } from "react";

// react-select'i dinamik olarak, SSR olmadan import ediyoruz
const Select = dynamic(() => import("react-select"), { ssr: false });

const options = [
  { value: "option1", label: "EN" },
  { value: "option2", label: "AZ" },
  { value: "option2", label: "RU" },
];

export default function CustomSelect() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const customStyles = {
    control: (base) => ({
      ...base,
    //   borderColor: "#d7e0ed",
    //   borderRadius: "1.2rem",
    //   boxShadow: "none",
      cursor: "pointer",
      // width: "12.749rem",
      width: "1rem",
      // height: "4.5921rem",
    //   color: "#293881",
    //   padding: "0.5rem 0.1rem",
    //   textAlign: "start",
    }),

    // option styles
    menu: (base) => ({
      ...base,
    //   borderRadius: "15px",
    //   border: "1px solid #E6E9EF",
      color: "#FFF",
      fontWeight: "500",
    }),
    option: (base, state) => ({
      ...base,
    //   backgroundColor: state.isFocused ? "#FFF" : "#FFFFFF",
      color: "#FFF",
      cursor: "pointer",
      fontSize: "1rem",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#FFF", // Örnek: kırmızı renk
      fontSize: "1rem", // Örnek: 16px font boyutu
    }),
    singleValue: (base) => ({
      ...base,
      color: "#FFF", // Seçili değerin rengini belirliyoruz
      fontSize: "1rem", // Font boyutunu ayarlıyoruz
      fontWeight: "500", // Font kalınlığını artırıyoruz
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#FFF",
      // fontSize: "12px", // Okun rengi burada ayarlanıyor
      transform: "scale(0.85)",
      strokeWidth: "1",
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
