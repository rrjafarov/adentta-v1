
import dynamic from "next/dynamic";

// Dynamically import react-select with SSR disabled
const Select = dynamic(() => import("react-select"), { ssr: false });

// const options = [
//   { value: "az", label: t?.sortFrom || "From A-Z" },
//   { value: "za", label: t?.sortFromZA || "From Z-A" },
// ];

export default function ReactSelect({t, value, onChange }) {
  const options = [
    { value: "az", label: t?.sortFrom || "From A-Z" },
    { value: "za", label: t?.sortFromZA || "From Z-A" },
  ];
  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#d7e0ed",
      borderRadius: "1.2rem",
      boxShadow: "none",
      cursor: "pointer",
      width: "100%",
      padding: "0.5rem 0.1rem",
      color: "#293881",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "15px",
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
    }),
    singleValue: (base) => ({
      ...base,
      color: "#293881",
      fontSize: "1.75rem",
      fontWeight: "500",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#293881",
      transform: "scale(0.85)",
      "&:hover": { color: "#1d2b53" },
    }),
  };

  const customComponents = {
    IndicatorSeparator: () => null,
  };

  return (
    <div className="selectProductSort">
      <Select
        value={value}
        onChange={onChange}
        options={options}
        styles={customStyles}
        components={customComponents}
        placeholder={t?.sortFrom || "From A-Z"}
        isSearchable={false}
      />
    </div>
  );
}