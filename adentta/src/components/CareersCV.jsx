// "use client";
// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import axiosInstance from "@/lib/axios";

// const CareersCV = ({ t }) => {
//   const fileInputRef = useRef(null);

//   // Form için state değişkenleri
//   const [name, setName] = useState("");
//   const [phoneInput, setPhoneInput] = useState("");
//   const [emailInput, setEmailInput] = useState("");
//   const [message, setMessage] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   // File input açma
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   // File seçildiğinde state'e yaz
//   const handleFileChange = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) setSelectedFile(file);
//   };

//   // Form gönderimi (ContactUS ile aynı JSON yapısı)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       title: "Career CV Submission",
//       key: "careers-form",
//       form_data: {
//         name: name,
//         phone: phoneInput,
//         email: emailInput,
//         message: message,
//         // Eğer API file desteği JSON içinde sadece isim isterse:
//         ...(selectedFile && { file_name: selectedFile.name }),
//       },
//     };

//     try {
//       const response = await axiosInstance.post(
//         "/form-data/send",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         setSubmitStatus("success");
//         // Temizle
//         setName("");
//         setPhoneInput("");
//         setEmailInput("");
//         setMessage("");
//         setSelectedFile(null);
//       } else {
//         setSubmitStatus("error");
//       }
//     } catch (error) {
//       console.error("Xəta gönderim sırasında:", error);
//       setSubmitStatus("error");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="careersCVvacancy">
//           <div className="careersCVText">
//             <span>{t?.careersPageCVMessage || "CV Message for Vacancy"}</span>
//             <p>{t?.careersPageCVFrame || "Frame is a long established fact that a reader will be distracted by the readable"}</p>
//           </div>
//           <div className="careersCVInputSection">
//             <div className="careersCVInput">
//               <div className="sendMessageInputs">
//                 <div className="sendMessageInput">
//                   <span>{t?.careersPageFormNameSurname || "Name/Surname"}</span>
//                   <input
//                     type="text"
//                     placeholder={t?.careersPageFormNameSurname || "Name/Surname"}
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className="sendMessageInput">
//                   <span>{t?.careersPageFormPhone || "Phone"}</span>
//                   <input
//                     type="text"
//                     placeholder="+994 00 000 00 00"
//                     value={phoneInput}
//                     onChange={(e) => setPhoneInput(e.target.value)}
//                   />
//                 </div>
//                 <div className="sendMessageInput">
//                   <span>{t?.careersPageFormEmail || "Email"}</span>
//                   <input
//                     type="email"
//                     placeholder={t?.careersPageFormEmail || "Email"}
//                     value={emailInput}
//                     onChange={(e) => setEmailInput(e.target.value)}
//                   />
//                 </div>
//                 <div className="downCV">
//                   <button
//                     type="button"
//                     className="downloadCV"
//                     onClick={handleButtonClick}
//                   >
//                     <span>
//                       {selectedFile ? selectedFile.name : t?.careersPageDownloadCV || "Download CV"}
//                     </span>
//                     <Image
//                       src="/icons/downloadCV.svg"
//                       alt="downloadCV"
//                       width={18}
//                       height={18}
//                     />
//                   </button>
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     style={{ display: "none" }}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="careersCVTextarea">
//               <div className="sendMessageTextarea">
//                 <span>{t?.careersPageFormMessage || "Message"}</span>
//                 <textarea
//                   name="adentta"
//                   id="adentta"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                 ></textarea>
//                 <input
//                   type="submit"
//                   value={t?.careersPageFormEnter || "Enter"}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>

//     </div>
//   );
// };

// export default CareersCV;















"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

const CareersCV = ({ t }) => {
  const fileInputRef = useRef(null);

  // Form üçün state dəyişənləri
  const [name, setName] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validation üçün state
  const [errors, setErrors] = useState({});

  // ----- FOCUS üçün refs -----
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const cvButtonRef = useRef(null);

  // Label xəta stili (span içində, yerini dəyişmir)
  const errorLabelStyle = { color: "#ff0000" };

  // CV xəta mətni: overlay (content-i itələmir) + soldan 1.4rem offset
  const cvErrorStyle = {
    position: "absolute",
    left: "1.4rem",
    top: "calc(100% + 4px)",
    color: "#ff0000",
    fontSize: "1.2rem",
    lineHeight: "1.4rem",
    pointerEvents: "none",
    display: "block",
    whiteSpace: "nowrap",
    zIndex: 1,
  };

  // Sadə yoxlama funksiyası
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = phoneInput.replace(/\D/g, "");

    if (!name.trim()) {
      newErrors.name = t?.validationNameRequired || "Ad/Soyad məcburidir.";
    }

    if (!phoneInput.trim()) {
      newErrors.phone =
        t?.validationPhoneRequired || "Telefon nömrəsi məcburidir.";
    } else if (phoneDigits.length < 9) {
      newErrors.phone =
        t?.validationPhoneInvalid || "Telefon nömrəsi düzgün formatda deyil.";
    }

    if (!emailInput.trim()) {
      newErrors.email = t?.validationEmailRequired || "Email məcburidir.";
    } else if (!emailRegex.test(emailInput)) {
      newErrors.email =
        t?.validationEmailInvalid || "Email düzgün formatda deyil.";
    }

    if (!message.trim()) {
      newErrors.message =
        t?.validationMessageRequired || "Mesaj bölməsi məcburidir.";
    }

    if (!selectedFile) {
      newErrors.cv = t?.validationCVRequired || "CV faylı seçilməlidir (PDF).";
    }

    return newErrors;
  };

  // File input açma
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // File seçildiğinde state'e yaz
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) setSelectedFile(file);
  };

  // Form göndərimi
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Öncə validasiya
    const foundErrors = validateForm();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      setSubmitStatus(null);

      // İlk səhv sahəyə yalnız focus (animasiya/scroll YOXDUR)
      const order = ["name", "phone", "email", "message", "cv"];
      for (const key of order) {
        if (foundErrors[key]) {
          if (key === "name") nameRef.current?.focus();
          else if (key === "phone") phoneRef.current?.focus();
          else if (key === "email") emailRef.current?.focus();
          else if (key === "message") messageRef.current?.focus();
          else if (key === "cv") cvButtonRef.current?.focus();
          break;
        }
      }
      return; // səhvlər varsa göndərmə
    }

    const payload = {
      title: "Career CV Submission",
      key: "careers-form",
      form_data: {
        name: name,
        phone: phoneInput,
        email: emailInput,
        message: message,
        ...(selectedFile && { file_name: selectedFile.name }),
      },
    };

    try {
      const response = await axiosInstance.post("/form-data/send", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setSubmitStatus("success");
        // Təmizlə
        setName("");
        setPhoneInput("");
        setEmailInput("");
        setMessage("");
        setSelectedFile(null);
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Xəta gönderim sırasında:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="careersCVvacancy">
          <div className="careersCVText">
            <span>{t?.careersPageCVMessage || "CV Message for Vacancy"}</span>
            <p>
              {t?.careersPageCVFrame ||
                "Frame is a long established fact that a reader will be distracted by the readable"}
            </p>
          </div>

          <div className="careersCVInputSection">
            <div className="careersCVInput">
              <div className="sendMessageInputs">
                {/* NAME */}
                <div className="sendMessageInput" style={{ position: "relative" }}>
                  <span style={errors.name ? errorLabelStyle : undefined}>
                    {errors.name
                      ? errors.name
                      : (t?.careersPageFormNameSurname || "Name/Surname")}
                  </span>
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder={t?.careersPageFormNameSurname || "Name/Surname"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                  />
                </div>

                {/* PHONE */}
                <div className="sendMessageInput" style={{ position: "relative" }}>
                  <span style={errors.phone ? errorLabelStyle : undefined}>
                    {errors.phone
                      ? errors.phone
                      : (t?.careersPageFormPhone || "Phone")}
                  </span>
                  <input
                    ref={phoneRef}
                    type="text"
                    placeholder="+994 00 000 00 00"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                  />
                </div>

                {/* EMAIL */}
                <div className="sendMessageInput" style={{ position: "relative" }}>
                  <span style={errors.email ? errorLabelStyle : undefined}>
                    {errors.email
                      ? errors.email
                      : (t?.careersPageFormEmail || "Email")}
                  </span>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder={t?.careersPageFormEmail || "Email"}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                  />
                </div>

                {/* CV BUTTON (xəta mətni yerində, butonun altında qalır) */}
                <div className="downCV" style={{ position: "relative" }}>
                  <button
                    ref={cvButtonRef}
                    type="button"
                    className="downloadCV"
                    onClick={handleButtonClick}
                  >
                    <span>
                      {selectedFile
                        ? selectedFile.name
                        : t?.careersPageDownloadCV || "Download CV"}
                    </span>
                    <Image
                      src="/icons/downloadCV.svg"
                      alt="downloadCV"
                      width={18}
                      height={18}
                    />
                  </button>
                  <input
                    type="file"
                    // DOCX + PDF dəstəyi
                    accept=".pdf,application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  {errors.cv && <span style={cvErrorStyle}>{errors.cv}</span>}
                </div>
              </div>
            </div>

            {/* MESSAGE */}
            <div className="careersCVTextarea">
              <div className="sendMessageTextarea" style={{ position: "relative" }}>
                <span style={errors.message ? errorLabelStyle : undefined}>
                  {errors.message
                    ? errors.message
                    : (t?.careersPageFormMessage || "Message")}
                </span>
                <textarea
                  ref={messageRef}
                  name="adentta"
                  id="adentta"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                ></textarea>

                <input type="submit" value={t?.careersPageFormEnter || "Enter"} />

                {submitStatus === "success" && (
                  <span
                    style={{
                      color: "#1B5E20",
                      fontSize: "1.2rem",
                      marginTop: "0.8rem",
                      display: "block",
                    }}
                  >
                    {t?.formSubmitSuccess || "Məlumat uğurla göndərildi."}
                  </span>
                )}
                {submitStatus === "error" && (
                  <span
                    style={{
                      color: "#ff0000",
                      fontSize: "1.2rem",
                      marginTop: "0.8rem",
                      display: "block",
                    }}
                  >
                    {t?.formSubmitError ||
                      "Göndərmə zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CareersCV;
































// "use client";
// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import axiosInstance from "@/lib/axios";

// const CareersCV = ({ t }) => {
//   const fileInputRef = useRef(null);

//   // Form üçün state dəyişənləri
//   const [name, setName] = useState("");
//   const [phoneInput, setPhoneInput] = useState("");
//   const [emailInput, setEmailInput] = useState("");
//   const [message, setMessage] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   // Validation üçün state
//   const [errors, setErrors] = useState({});

//   // Label xəta stili (span içində, yerini dəyişmir)
//   const errorLabelStyle = { color: "#ff0000" };

//   // CV xəta mətni: overlay (content-i itələmir) + soldan 1.4rem offset
//   const cvErrorStyle = {
//     position: "absolute",
//     left: "1.4rem",
//     top: "calc(100% + 4px)",
//     color: "#ff0000",
//     fontSize: "1.2rem",
//     lineHeight: "1.4rem",
//     pointerEvents: "none",
//     display: "block",
//     whiteSpace: "nowrap",
//     zIndex: 1,
//   };

//   // Sadə yoxlama funksiyası
//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneDigits = phoneInput.replace(/\D/g, "");

//     if (!name.trim()) {
//       newErrors.name = t?.validationNameRequired || "Ad/Soyad məcburidir.";
//     }

//     if (!phoneInput.trim()) {
//       newErrors.phone =
//         t?.validationPhoneRequired || "Telefon nömrəsi məcburidir.";
//     } else if (phoneDigits.length < 9) {
//       newErrors.phone =
//         t?.validationPhoneInvalid || "Telefon nömrəsi düzgün formatda deyil.";
//     }

//     if (!emailInput.trim()) {
//       newErrors.email = t?.validationEmailRequired || "Email məcburidir.";
//     } else if (!emailRegex.test(emailInput)) {
//       newErrors.email =
//         t?.validationEmailInvalid || "Email düzgün formatda deyil.";
//     }

//     if (!message.trim()) {
//       newErrors.message =
//         t?.validationMessageRequired || "Mesaj bölməsi məcburidir.";
//     }

//     if (!selectedFile) {
//       newErrors.cv = t?.validationCVRequired || "CV faylı seçilməlidir (PDF).";
//     }

//     return newErrors;
//   };

//   // File input açma
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   // File seçildiğinde state'e yaz
//   const handleFileChange = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) setSelectedFile(file);
//   };

//   // Form göndərimi
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Öncə validasiya
//     const foundErrors = validateForm();
//     setErrors(foundErrors); // gizlətmə yoxdur
//     if (Object.keys(foundErrors).length > 0) {
//       setSubmitStatus(null);
//       return; // səhvlər varsa göndərmə
//     }

//     const payload = {
//       title: "Career CV Submission",
//       key: "careers-form",
//       form_data: {
//         name: name,
//         phone: phoneInput,
//         email: emailInput,
//         message: message,
//         ...(selectedFile && { file_name: selectedFile.name }),
//       },
//     };

//     try {
//       const response = await axiosInstance.post("/form-data/send", payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 200) {
//         setSubmitStatus("success");
//         // Təmizlə
//         setName("");
//         setPhoneInput("");
//         setEmailInput("");
//         setMessage("");
//         setSelectedFile(null);
//         setErrors({});
//       } else {
//         setSubmitStatus("error");
//       }
//     } catch (error) {
//       setSubmitStatus("error");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="careersCVvacancy">
//           <div className="careersCVText">
//             <span>{t?.careersPageCVMessage || "CV Message for Vacancy"}</span>
//             <p>
//               {t?.careersPageCVFrame ||
//                 "Frame is a long established fact that a reader will be distracted by the readable"}
//             </p>
//           </div>

//           <div className="careersCVInputSection">
//             <div className="careersCVInput">
//               <div className="sendMessageInputs">
//                 {/* NAME */}
//                 <div className="sendMessageInput" style={{ position: "relative" }}>
//                   <span style={errors.name ? errorLabelStyle : undefined}>
//                     {errors.name
//                       ? errors.name
//                       : (t?.careersPageFormNameSurname || "Name/Surname")}
//                   </span>
//                   <input
//                     type="text"
//                     placeholder={t?.careersPageFormNameSurname || "Name/Surname"}
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     aria-invalid={Boolean(errors.name)}
//                   />
//                 </div>

//                 {/* PHONE */}
//                 <div className="sendMessageInput" style={{ position: "relative" }}>
//                   <span style={errors.phone ? errorLabelStyle : undefined}>
//                     {errors.phone
//                       ? errors.phone
//                       : (t?.careersPageFormPhone || "Phone")}
//                   </span>
//                   <input
//                     type="text"
//                     placeholder="+994 00 000 00 00"
//                     value={phoneInput}
//                     onChange={(e) => setPhoneInput(e.target.value)}
//                     aria-invalid={Boolean(errors.phone)}
//                   />
//                 </div>

//                 {/* EMAIL */}
//                 <div className="sendMessageInput" style={{ position: "relative" }}>
//                   <span style={errors.email ? errorLabelStyle : undefined}>
//                     {errors.email
//                       ? errors.email
//                       : (t?.careersPageFormEmail || "Email")}
//                   </span>
//                   <input
//                     type="email"
//                     placeholder={t?.careersPageFormEmail || "Email"}
//                     value={emailInput}
//                     onChange={(e) => setEmailInput(e.target.value)}
//                     aria-invalid={Boolean(errors.email)}
//                   />
//                 </div>

//                 {/* CV BUTTON (xəta mətni yerində, butonun altında qalır) */}
//                 <div className="downCV" style={{ position: "relative" }}>
//                   <button
//                     type="button"
//                     className="downloadCV"
//                     onClick={handleButtonClick}
//                   >
//                     <span>
//                       {selectedFile
//                         ? selectedFile.name
//                         : t?.careersPageDownloadCV || "Download CV"}
//                     </span>
//                     <Image
//                       src="/icons/downloadCV.svg"
//                       alt="downloadCV"
//                       width={18}
//                       height={18}
//                     />
//                   </button>
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     style={{ display: "none" }}
//                   />
//                   {errors.cv && <span style={cvErrorStyle}>{errors.cv}</span>}
//                 </div>
//               </div>
//             </div>

//             {/* MESSAGE */}
//             <div className="careersCVTextarea">
//               <div className="sendMessageTextarea" style={{ position: "relative" }}>
//                 <span style={errors.message ? errorLabelStyle : undefined}>
//                   {errors.message
//                     ? errors.message
//                     : (t?.careersPageFormMessage || "Message")}
//                 </span>
//                 <textarea
//                   name="adentta"
//                   id="adentta"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   aria-invalid={Boolean(errors.message)}
//                 ></textarea>

//                 <input type="submit" value={t?.careersPageFormEnter || "Enter"} />

//                 {submitStatus === "success" && (
//                   <span
//                     style={{
//                       color: "#1B5E20",
//                       fontSize: "1.2rem",
//                       marginTop: "0.8rem",
//                       display: "block",
//                     }}
//                   >
//                     {t?.formSubmitSuccess || "Məlumat uğurla göndərildi."}
//                   </span>
//                 )}
//                 {submitStatus === "error" && (
//                   <span
//                     style={{
//                       color: "#ff0000",
//                       fontSize: "1.2rem",
//                       marginTop: "0.8rem",
//                       display: "block",
//                     }}
//                   >
//                     {t?.formSubmitError ||
//                       "Göndərmə zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CareersCV;
