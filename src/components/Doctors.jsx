// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import ReactSelectDrop from "./ReactSelectDrop";
// import ReactSelectRegionType from "./ReactSelectRegionType";
// import ReactSelectDoctorType from "./ReactSelectDoctorType";

// const Doctors = ({ doctorsData }) => {
//   return (
//     <div>
//       <div className="container">
//         <div className="doctorsTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>Doctors</h4>
//         </div>
//         <div className="doctorsPageHeaderText">
//           <span>About Us</span>
//           <h2>Doctors</h2>
//           <p>
//             Stay updated on the latest medical industry events, workshops, and
//             exhibitions. Join us to connect, learn, and grow together! English.
//             It is a long established fact that a reader will be distracted by
//             the readable content of
//           </p>
//           <div className="doctorsPageSelectButtons">
//             <div className="doctorsSelects">
//               <div className="doctorsSelect doctorsSelectDentist">
//                 <ReactSelectDoctorType />
//               </div>
//               <div className="doctorsSelect">
//                 <ReactSelectDrop />
//               </div>
//             </div>
//           </div>
//         </div>

//         <section id="doctorsCards">
//           <div className="row">
//             {doctorsData.map((doctor) => {
//               return (
//                 <div key={doctor.id} className="xl-4 lg-4 md-6 sm-12">
//                   <Link
//                     href={`/doctors/${doctor.title
//                       .toLowerCase()
//                       .replace(/\s+/g, "-")}-${doctor.id}`}
//                     className="block"
//                   >
//                     <div className="doctorsCards">
//                       <div className="doctorsCard">
//                         <div className="doctorsCardImg">
//                           {doctor.image && (
//                             <Image
//                               src={`https://admin.adentta.az/storage${doctor.image}`}
//                               alt={doctor.title}
//                               width={400}
//                               height={400}
//                             />
//                           )}
//                         </div>
//                       </div>
//                       <div className="doctorsCardContent">
//                         <div className="doctorJobTypes">
//                           <div className="doctorJobType">
//                             <span>Chief surgeon</span>
//                           </div>
//                           <div className="doctorJobType">
//                             <span>Surgeon</span>
//                           </div>
//                         </div>
//                         <h3>{doctor.title}</h3>
//                         <div className="doctorBey">
//                           <span>{doctor.workplace}</span>
//                           <Image
//                             src="/icons/dotIMG.svg"
//                             alt="1"
//                             width={6}
//                             height={6}
//                           />
//                           <span>{doctor.location}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Doctors;

// !
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import ReactSelectDoctorType from "./ReactSelectDoctorType";
// import ReactSelectDrop from "./ReactSelectDrop";

// const Doctors = ({ doctorsData }) => {
//   // ✅ Seçilən həkim tipi və marka üçün state-lər
//   const [selectedDoctorType, setSelectedDoctorType] = useState(null);
//   const [selectedBrand, setSelectedBrand] = useState(null); // Marka seçimi

//   // ✅ Filterləmə loqikası
//   const filteredDoctors = doctorsData.filter((doctor) => {
//     const matchesDoctorType = selectedDoctorType
//       ? doctor.category?.some((cat) => cat.title === selectedDoctorType.label)
//       : true;
//     const matchesBrand = selectedBrand
//       ? doctor.brand?.some((brand) => brand.title === selectedBrand.label)
//       : true;

//     return matchesDoctorType && matchesBrand; // Filtreleme
//   });

//   return (
//     <div>
//       <div className="container">
//         <div className="doctorsTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>Doctors</h4>
//         </div>

//         <div className="doctorsPageHeaderText">
//           <span>About Us</span>
//           <h2>Doctors</h2>
//           <p>
//             Stay updated on the latest medical industry events, workshops, and
//             exhibitions. Join us to connect, learn, and grow together!
//           </p>

//           <div className="doctorsPageSelectButtons">
//             <div className="doctorsSelects">
//               <div className="doctorsSelect doctorsSelectDentist">
//                 <ReactSelectDoctorType
//                   onChange={(value) => setSelectedDoctorType(value)}
//                 />
//               </div>
//               <div className="doctorsSelect">
//                 <ReactSelectDrop
//                   options={doctorsData
//                     .map((doctor) =>
//                       doctor.brand.map((brand) => ({
//                         label: brand.title,
//                         value: brand.id,
//                       }))
//                     )
//                     .flat()}
//                   onChange={(value) => setSelectedBrand(value)}
//                   placeholder="Select Brand"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <section id="doctorsCards">
//           <div className="row">
//             {/* ✅ Filtrlənmiş data ilə map olunur */}
//             {filteredDoctors.map((doctor) => (
//               <div key={doctor.id} className="xl-4 lg-4 md-6 sm-12">
//                 <Link
//                   href={`/doctors/${doctor.title
//                     .toLowerCase()
//                     .replace(/\s+/g, "-")}-${doctor.id}`}
//                   className="block"
//                 >
//                   <div className="doctorsCards">
//                     <div className="doctorsCard">
//                       <div className="doctorsCardImg">
//                         {doctor.image && (
//                           <Image
//                             src={`https://admin.adentta.az/storage${doctor.image}`}
//                             alt={doctor.title}
//                             width={400}
//                             height={400}
//                           />
//                         )}
//                       </div>
//                     </div>
//                     <div className="doctorsCardContent">
//                       <div className="doctorJobTypes">
//                         {doctor.category?.map((cat, index) => (
//                           <div className="doctorJobType" key={index}>
//                             <span>{cat.title}</span>
//                           </div>
//                         ))}
//                       </div>
//                       <h3>{doctor.title}</h3>
//                       <div className="doctorBey">
//                         <span>{doctor.workplace}</span>
//                         <Image
//                           src="/icons/dotIMG.svg"
//                           alt="1"
//                           width={6}
//                           height={6}
//                         />
//                         <span>{doctor.location}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Doctors;

// !

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ReactSelectDoctorType from "./ReactSelectDoctorType";
import ReactSelectDrop from "./ReactSelectDrop";

const Doctors = ({ doctorsData, t }) => {
  // ✅ Seçilən həkim tipi və marka üçün state-lər
  const [selectedDoctorType, setSelectedDoctorType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // ✅ Filterləmə loqikası
  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesDoctorType = selectedDoctorType
      ? doctor.category?.some((cat) => cat.title === selectedDoctorType.label)
      : true; // Doktor tipi seçilmemişse, tüm doktorlar geçer
    const matchesBrand = selectedBrand
      ? doctor.brand?.some((brand) => brand.title === selectedBrand.label)
      : true; 

    return matchesDoctorType && matchesBrand;
  });

  const handleDoctorTypeChange = (value) => {
    setSelectedDoctorType(value); 
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value); 
  };

  return (
    <div>
      <div className="container">
        <div className="doctorsTop topper">
          <Link href="/">
            <h1>Adentta</h1>
          </Link>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <h4>{t?.doctors || "Doctors"}</h4>
        </div>

        <div className="doctorsPageHeaderText">
          <span>{t?.aboutUS || "About Us"}</span>
          <h2>{t?.doctors || "Doctors"}</h2>
          <p>
          {t?.doctorsPageSubTitle || "Doctors Subtitle"}
          </p>

          <div className="doctorsPageSelectButtons">
            <div className="doctorsSelects">
              <div className="doctorsSelect doctorsSelectDentist">
                <ReactSelectDoctorType
                  onChange={handleDoctorTypeChange}
                  t={t} // Seçilen doktor tipi işleme
                />
              </div>
              <div className="doctorsSelect">
                <ReactSelectDrop
                  // onChange={handleBrandChange} // Seçilen marka işleme
                  onChange={(value) => setSelectedBrand(value)}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>

        <section id="doctorsCards">
          <div className="row">
            {/* ✅ Filtrlənmiş data ilə map olunur */}
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="xl-3 lg-3 md-6 sm-12">
                <Link
                  href={`/doctors/${doctor?.slug?.toLowerCase()
                    .replace(/\s+/g, "-")}-${doctor.id}`}
                  className="block"
                >
                  <div className="doctorsCards">
                    <div className="doctorsCard">
                      <div className="doctorsCardImg">
                        {doctor.image && (
                          <Image
                            src={`https://admin.adentta.az/storage${doctor.image}`}
                            alt={doctor.title}
                            width={400}
                            height={400}
                          />
                        )}
                      </div>
                    </div>
                    <div className="doctorsCardContent">
                      <div className="doctorJobTypes">
                        {doctor.category?.map((cat, index) => (
                          <div className="doctorJobType" key={index}>
                            <span>{cat.title}</span>
                          </div>
                        ))}
                      </div>
                      <h3>{doctor.title}</h3>
                      <div className="doctorBey">
                        <span>{doctor.workplace}</span>
                        <Image
                          src="/icons/dotIMG.svg"
                          alt="1"
                          width={6}
                          height={6}
                        />
                        <span>{doctor.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Doctors;
