// import dynamic from "next/dynamic";
// import { useState } from "react";
// import Image from "next/image";
// import { components } from "react-select";

// const Select = dynamic(() => import("react-select"), { ssr: false });

// // Dropdown'da sadece bu seçenekler görünsün
// const options = [
//   { value: "ongoing", label: "Ongoing" },
//   { value: "expected", label: "Expected" },
//   { value: "finished", label: "Finished" },
// ];

// // "Select Status" sadece ekranda görünmesi için kullanılan özel seçenek
// const defaultOption = { value: "select", label: "Select Status" };

// export default function CustomSelect({ eventsData }) {
//   const [selectedOption, setSelectedOption] = useState(defaultOption);
//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       borderRadius: "1rem",
//       boxShadow: "none",
//       cursor: "pointer",
//       width: "100%",
//       height: "4.2921rem",
//       color: "#293881",
//       backgroundColor: "e9f2ff",
//       border: "0px solid #d7e0ed",
//     }),
//     menu: (base) => ({
//       ...base,
//       borderRadius: "1rem",
//       border: "0.1px solid #d7e0ed",
//       color: "#293881",
//       fontSize: "1.5rem",
//       fontWeight: "500",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused ? "#fff" : "#fff",
//       color: "#293881",
//       cursor: "pointer",
//       fontSize: "1.6rem",
//       borderRadius: "15px",
//       "@media (max-width: 768px)": {
//         fontSize: "2rem",
//       },
//     }),
//     placeholder: (base) => ({
//       ...base,
//       color: "#293881",
//       fontSize: "1.5rem",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: "#293881",
//       fontSize: "1.7rem",
//       fontWeight: "500",
//       "@media (max-width: 768px)": {
//         fontSize: "1.8rem",
//       },
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
//     <div className="selectProductSortStatus">
//       <Select
//         value={selectedOption}
//         onChange={setSelectedOption}
//         options={options} // Sadece gerçek statüler burada
//         styles={customStyles}
//         components={customComponents}
//         placeholder="Select Status"
//         isSearchable={false}
//       />
//     </div>
//   );
// }

// !

// import dynamic from "next/dynamic";
// import { useState } from "react";
// import { components } from "react-select";

// const Select = dynamic(() => import("react-select"), { ssr: false });

// const options = [
//   { value: "all", label: "All" },
//   { value: "ongoing", label: "Ongoing" },
//   { value: "expected", label: "Expected" },
//   { value: "finished", label: "Finished" },
// ];

// export default function ReactSelectStatus({ eventsData, onStatusChange }) {
//   const [selectedOption, setSelectedOption] = useState({ value: "all", label: "All" });

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       borderRadius: "1rem",
//       boxShadow: "none",
//       cursor: "pointer",
//       width: "100%",
//       height: "4.2921rem",
//       color: "#293881",
//       backgroundColor: "e9f2ff",
//       border: "0px solid #d7e0ed",
//     }),
//     menu: (base) => ({
//       ...base,
//       borderRadius: "1rem",
//       border: "0.1px solid #d7e0ed",
//       color: "#293881",
//       fontSize: "1.5rem",
//       fontWeight: "500",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused ? "#fff" : "#fff",
//       color: "#293881",
//       cursor: "pointer",
//       fontSize: "1.6rem",
//       borderRadius: "15px",
//       "@media (max-width: 768px)": {
//         fontSize: "2rem",
//       },
//     }),
//     placeholder: (base) => ({
//       ...base,
//       color: "#293881",
//       fontSize: "1.5rem",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: "#293881",
//       fontSize: "1.7rem",
//       fontWeight: "500",
//       "@media (max-width: 768px)": {
//         fontSize: "1.8rem",
//       },
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

//   const handleChange = (option) => {
//     setSelectedOption(option);
//     onStatusChange(option.value);
//   };

//   return (
//     <div className="selectProductSortStatus">
//       <Select
//         value={selectedOption}
//         onChange={handleChange}
//         options={options}
//         styles={customStyles}
//         components={customComponents}
//         placeholder="Select Status"
//         isSearchable={false}
//       />
//     </div>
//   );
// }

// *

// import dynamic from "next/dynamic";
// import { useState } from "react";
// import { components } from "react-select";

// const Select = dynamic(() => import("react-select"), { ssr: false });

// const options = [
//   // { value: "all", label: t?.allSelect || "All" },
//   { value: "all", label: "All" },
//   { value: "ongoing", label: "Ongoing" },
//   { value: "expected", label: "Expected" },
//   { value: "finished", label: "Finished" },
// ];

// export default function ReactSelectStatus({t, eventsData, onStatusChange }) {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       borderRadius: "1rem",
//       boxShadow: "none",
//       cursor: "pointer",
//       width: "100%",
//       height: "4.2921rem",
//       color: "#293881",
//       backgroundColor: "e9f2ff",
//       border: "0px solid #d7e0ed",
//       minWidth: "15rem",
//     }),
//     menu: (base) => ({
//       ...base,
//       borderRadius: "1rem",
//       border: "0.1px solid #d7e0ed",
//       color: "#293881",
//       fontSize: "1.5rem",
//       fontWeight: "400",
//       minWidth: "15rem",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused ? "#fff" : "#fff",
//       color: "#293881",
//       cursor: "pointer",
//       fontSize: "1.6rem",
//       borderRadius: "15px",
//       minWidth: "15rem",
//       "@media (max-width: 768px)": {
//         fontSize: "2rem",
//       },
//     }),
//     placeholder: (base) => ({
//       ...base,
//       color: "#293881",
//       fontSize: "1.7rem",
//       fontWeight: "400",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       color: "#293881",
//       fontSize: "1.6rem",
//       fontWeight: "400",
//       "@media (max-width: 768px)": {
//         fontSize: "2rem",
//       },
//     }),
//     dropdownIndicator: (base) => ({
//       ...base,
//       color: "#293881",
//       fontWeight: "200" ,
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

//   const handleChange = (option) => {
//     setSelectedOption(option);
//     onStatusChange(option ? option.value : "all"); // Heç bir seçim edilməyibsə "all" göndər
//   };

//   return (
//     <div className="selectProductSortStatus">
//       <Select
//         value={selectedOption}
//         onChange={handleChange}
//         options={options}
//         styles={customStyles}
//         components={customComponents}
//         placeholder="Select Status"
//         isSearchable={false}
//       />
//     </div>
//   );
// }










// * son versiya







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
    // { value: "ongoing", label: "Ongoing" },
    // { value: "expected", label: "Expected" },
    // { value: "finished", label: "Finished" },
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
      minWidth: "15rem",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "1rem",
      border: "0.1px solid #d7e0ed",
      color: "#293881",
      fontSize: "1.5rem",
      fontWeight: "400",
      minWidth: "15rem",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#fff" : "#fff",
      color: "#293881",
      cursor: "pointer",
      fontSize: "1.6rem",
      borderRadius: "15px",
      minWidth: "15rem",
      "@media (max-width: 768px)": {
        fontSize: "2rem",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#293881",
      fontSize: "1.7rem",
      fontWeight: "400",
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
// * son versiya
