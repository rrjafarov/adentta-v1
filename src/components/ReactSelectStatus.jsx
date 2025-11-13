import dynamic from "next/dynamic";
import { useState } from "react";
import { components } from "react-select";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function ReactSelectStatus({ t, eventsData, onStatusChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "all", label: t?.allSelect || "All" },
    { value: "ongoing", label: t?.ongoing || "Ongoing" },
    { value: "expected", label: t?.expected || "Expected" },
    { value: "finished", label: t?.finished || "Finished" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "1rem",
      boxShadow: "none",
      cursor: "pointer",
      width: "100%",
      height: "4.2921rem",
      color: "#293881",
      backgroundColor: "e9f2ff",
      border: "0px solid #d7e0ed",
      // minWidth: "15rem"
      width: "16rem",
      "@media (max-width: 768px)": {
        fontSize: "1.6rem",
        width: "18rem",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "1rem",
      border: "0.1px solid #d7e0ed",
      color: "#293881",
      fontSize: "1.5rem",
      fontWeight: "400",
      // minWidth: "15rem",
      width: "16rem",
      "@media (max-width: 768px)": {
        fontSize: "1.6rem",
        width: "18rem",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#fff" : "#fff",
      color: "#293881",
      cursor: "pointer",
      fontSize: "1.6rem",
      borderRadius: "15px",
      width: "100%",

      "@media (max-width: 768px)": {
        fontSize: "1.8rem",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#293881",
      fontSize: "1.7rem",
      fontWeight: "400",
      "@media (max-width: 768px)": {
        fontSize: "1.8rem",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#293881",
      fontSize: "1.6rem",
      fontWeight: "400",
      "@media (max-width: 768px)": {
        fontSize: "2rem",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#293881",
      fontWeight: "200",
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

  const handleChange = (option) => {
    setSelectedOption(option);
    onStatusChange(option ? option.value : "all");
  };

  return (
    <div className="selectProductSortStatus">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        components={customComponents}
        placeholder={t?.selectStatus || "Select Status"}
        isSearchable={false}
      />
    </div>
  );
}
