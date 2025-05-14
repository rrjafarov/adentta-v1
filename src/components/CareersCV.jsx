// "use client";
// import React, { useRef, useState } from "react";
// import Image from "next/image";

// const CareersCV = ({ t }) => {
//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Düyməyə kliklə file input'u açır
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   // Fayl seçildikdə state-ə yazır
//   const handleFileChange = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) setSelectedFile(file);
//   };

//   return (
//     <div>
//       <div className="careersCVvacancy">
//         <div className="careersCVText">
//           <span>{t?.careersPageCVMessage || "CV Message for Vacancy"}</span>
//           <p>
//             {t?.careersPageCVFrame ||
//               "Frame is a long established fact that a reader will be distracted by the readable"}
//           </p>
//         </div>
//         <div className="careersCVInputSection">
//           <div className="careersCVInput">
//             <div className="sendMessageInputs">
//               <div className="sendMessageInput">
//                 <span>{t?.careersPageFormNameSurname || "Name/Surname"}</span>
//                 <input type="text" placeholder={t?.careersPageFormNameSurname || "Name/Surname"} />
//               </div>
//               <div className="sendMessageInput">
//                 <span>{t?.careersPageFormPhone || "Phone"}</span>
//                 <input type="text" placeholder="+994 70 000 00 00" />
//               </div>
//               <div className="sendMessageInput">
//                 <span>{t?.careersPageFormEmail || "Email"}</span>
//                 <input type="email" placeholder="info@adennta.az" />
//               </div>
//               <div className="downCV">
//                 <button
//                   type="button"
//                   className="downloadCV"
//                   onClick={handleButtonClick}
//                 >
//                   <span>
//                     {selectedFile ? selectedFile.name : t?.careersPageDownloadCV || "Download CV"}
//                   </span>
//                   <Image
//                     src="/icons/downloadCV.svg"
//                     alt="downloadCV"
//                     width={18}
//                     height={18}
//                   />
//                 </button>
//                 {/* Hidden file input for selecting CV */}
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="careersCVTextarea">
//             <div className="sendMessageTextarea">
//               <span>{t?.careersPageFormMessage || "Message"}</span>
//               <textarea name="adentta" id="adentta"></textarea>
//               <input type="submit" value={t?.careersPageFormEnter || "Enter"} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CareersCV;



















































// !Son 
"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

const CareersCV = ({ t }) => {
  const fileInputRef = useRef(null);

  // Form için state değişkenleri
  const [name, setName] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  // File input açma
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // File seçildiğinde state'e yaz
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) setSelectedFile(file);
  };

  // Form gönderimi (ContactUS ile aynı JSON yapısı)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: "Career CV Submission",
      form_data: {
        name: name,
        phone: phoneInput,
        email: emailInput,
        message: message,
        // Eğer API file desteği JSON içinde sadece isim isterse:
        ...(selectedFile && { file_name: selectedFile.name }),
      },
    };

    try {
      const response = await axiosInstance.post(
        "/form-data/send",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        // Temizle
        setName("");
        setPhoneInput("");
        setEmailInput("");
        setMessage("");
        setSelectedFile(null);
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
            <p>{t?.careersPageCVFrame || "Frame is a long established fact that a reader will be distracted by the readable"}</p>
          </div>
          <div className="careersCVInputSection">
            <div className="careersCVInput">
              <div className="sendMessageInputs">
                <div className="sendMessageInput">
                  <span>{t?.careersPageFormNameSurname || "Name/Surname"}</span>
                  <input
                    type="text"
                    placeholder={t?.careersPageFormNameSurname || "Name/Surname"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="sendMessageInput">
                  <span>{t?.careersPageFormPhone || "Phone"}</span>
                  <input
                    type="text"
                    placeholder="+994 70 000 00 00"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                  />
                </div>
                <div className="sendMessageInput">
                  <span>{t?.careersPageFormEmail || "Email"}</span>
                  <input
                    type="email"
                    placeholder={t?.careersPageFormEmail || "Email"}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>
                <div className="downCV">
                  <button
                    type="button"
                    className="downloadCV"
                    onClick={handleButtonClick}
                  >
                    <span>
                      {selectedFile ? selectedFile.name : t?.careersPageDownloadCV || "Download CV"}
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
                    accept="application/pdf"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            <div className="careersCVTextarea">
              <div className="sendMessageTextarea">
                <span>{t?.careersPageFormMessage || "Message"}</span>
                <textarea
                  name="adentta"
                  id="adentta"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <input
                  type="submit"
                  value={t?.careersPageFormEnter || "Enter"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* {submitStatus === "success" && (
        <p className="success-message">
          {t?.contactFormSuccess || "Mesaj uğurla göndərildi!"}
        </p>
      )}
      {submitStatus === "error" && (
        <p className="error-message">
          {t?.contactFormError || "Mesaj göndərilə bilmədi."}
        </p>
      )} */}
    </div>
  );
};

export default CareersCV;

// !Son 