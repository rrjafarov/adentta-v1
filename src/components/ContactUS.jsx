// import React from "react";
// import ContactPageLink from "./ContactPageLink";
// import ContactPageMap from "./ContactPageMap";
// import ContactVideo from "./ContactVideo";
// import Link from "next/link";

// const ContactUS = ({
//   wpNumber,
//   phone,
//   email,
//   wpLink,
//   linkedin,
//   instagram,
//   facebook,
//   workHoursMondayFriday,
//   workHoursSaturday,
//   map,
//   videoUrl,
//   locationHeadOffice,
//   locationStore,
//   videoTitle,
//   t,
// }) => {
//   return (
//     <>
//       <div id="contactPage">
//         <div className="container">
//           <div className="contactPageTop topper"> 
//             <Link href="/">
//               <h1 className="topper">Adentta</h1>
//             </Link>
//             <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
//             <h4 className="topper">{t?.contact || "Contact"}</h4>
//           </div>
//           <div className="contactPageHeaderText">
//             <h2>{t?.contactPageTitle || "contact infos"}</h2>
//             <span>{t?.contact || "Contact"}</span>
//           </div>

//           <div className="contactPageLinks">
//             <ContactPageLink
//               t={t}
//               wpNumber={wpNumber}
//               phone={phone}
//               email={email}
//               wpLink={wpLink}
//               linkedin={linkedin}
//               instagram={instagram}
//               facebook={facebook}
//               locationHeadOffice={locationHeadOffice}
//               workHoursMondayFriday={workHoursMondayFriday}
//               workHoursSaturday={workHoursSaturday}
//             />
//           </div>

//           <div className="sendMessage">
//             {/* <div className="row"> */}
//             <div className="xl-4 lg-4 md-6 sm-12">
//               <div className="sendMessageText">
//                 <span>{t?.contactPageFormTitle || "Send Message"}</span>
//                 <p>{t?.contactPageFormText || "Send message Text"}</p>
//               </div>
//             </div>

//             <div className="xl-8 lg-8 md-6 sm-12">
//               <div className="sendMessageForm">
//                 <div className="sendMessageInputs">
//                   <div className="sendMessageInput">
//                     <span>
//                       {t?.careersPageFormNameSurname || "Name&Surname"}
//                     </span>
//                     <input type="text" placeholder={t?.careersPageFormNameSurname || "Name&Surname"} />
//                   </div>
//                   <div className="sendMessageInput">
//                     <span>{t?.careersPageFormPhone || "Phone"}</span>
//                     <input type="text" placeholder="+994 70 000 00 00" />
//                   </div>
//                   <div className="sendMessageInput">
//                     <span>{t?.careersPageFormEmail || "Email"}</span>
//                     <input type="email" placeholder={t?.careersPageFormEmail || "Email"} />
//                   </div>
//                 </div>
//                 <div className="sendMessageTextarea">
//                   <span>{t?.careersPageFormMessage || "Message"}</span>
//                   <textarea name="adentta" id="adentta"></textarea>
//                   <input
//                     type="submit"
//                     value={t?.careersPageFormEnter || "Enter"}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="contactPageMap">
//             <ContactPageMap
//               t={t}
//               email={email}
//               locationHeadOffice={locationHeadOffice}
//               locationStore={locationStore}
//               map={map}
//             />
//           </div>
//           <ContactVideo videoUrl={videoUrl} videoTitle={videoTitle} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactUS;

































//! Son versiya
// "use client";
// import React, { useState } from "react";
// import ContactPageLink from "./ContactPageLink";
// import ContactPageMap from "./ContactPageMap";
// import ContactVideo from "./ContactVideo";
// import Link from "next/link";
// import axiosInstance from "@/lib/axios";


// const ContactUS = ({
//   wpNumber,
//   phone,
//   email,
//   wpLink,
//   linkedin,
//   instagram,
//   facebook,
//   workHoursMondayFriday,
//   workHoursSaturday,
//   map,
//   videoUrl,
//   locationHeadOffice,
//   locationStore,
//   videoTitle,
//   t,
// }) => {
//   // Form üçün state dəyişənləri
//   const [name, setName] = useState("");
//   const [phoneInput, setPhoneInput] = useState(""); // 'phone' prop ilə qarışmasın deyə 'phoneInput' adlandırdıq
//   const [emailInput, setEmailInput] = useState(""); // 'email' prop ilə qarışmasın deyə 'emailInput' adlandırdıq
//   const [message, setMessage] = useState("");
//   const [submitStatus, setSubmitStatus] = useState(null);

//   // Formun göndərilməsi üçün funksiya
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       name,
//       phone: phoneInput,
//       email: emailInput,
//       message,
//     };

//     try {
//       const response = await axiosInstance.post("/form-data/send", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200) {
//         setSubmitStatus("success");
//         // Formu təmizləyirik
//         setName("");
//         setPhoneInput("");
//         setEmailInput("");
//         setMessage("");
//       } else {
//         setSubmitStatus("error");
//       }
//     } catch (error) {
//       console.error("Xəta:", error);
//       setSubmitStatus("error");
//     }
//   };

//   return (
//     <>
//       <div id="contactPage">
//         <div className="container">
//           <div className="contactPageTop topper">
//             <Link href="/">
//               <h1 className="topper">Adentta</h1>
//             </Link>
//             <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
//             <h4 className="topper">{t?.contact || "Contact"}</h4>
//           </div>
//           <div className="contactPageHeaderText">
//             <h2>{t?.contactPageTitle || "contact infos"}</h2>
//             <span>{t?.contact || "Contact"}</span>
//           </div>

//           <div className="contactPageLinks">
//             <ContactPageLink
//               t={t}
//               wpNumber={wpNumber}
//               phone={phone}
//               email={email}
//               wpLink={wpLink}
//               linkedin={linkedin}
//               instagram={instagram}
//               facebook={facebook}
//               locationHeadOffice={locationHeadOffice}
//               workHoursMondayFriday={workHoursMondayFriday}
//               workHoursSaturday={workHoursSaturday}
//             />
//           </div>

//           <div className="sendMessage">
//             {/* <div className="row"> */}
//             <div className="xl-4 lg-4 md-6 sm-12">
//               <div className="sendMessageText">
//                 <span>{t?.contactPageFormTitle || "Send Message"}</span>
//                 <p>{t?.contactPageFormText || "Send message Text"}</p>
//               </div>
//             </div>

//             <div className="xl-8 lg-8 md-6 sm-12">
//               <div className="sendMessageForm">
//                 <form onSubmit={handleSubmit}>
//                   <div className="sendMessageInputs">
//                     <div className="sendMessageInput">
//                       <span>
//                         {t?.careersPageFormNameSurname || "Name&Surname"}
//                       </span>
//                       <input
//                         type="text"
//                         placeholder={
//                           t?.careersPageFormNameSurname || "Name&Surname"
//                         }
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                     </div>
//                     <div className="sendMessageInput">
//                       <span>{t?.careersPageFormPhone || "Phone"}</span>
//                       <input
//                         type="text"
//                         placeholder="+994 70 000 00 00"
//                         value={phoneInput}
//                         onChange={(e) => setPhoneInput(e.target.value)}
//                       />
//                     </div>
//                     <div className="sendMessageInput">
//                       <span>{t?.careersPageFormEmail || "Email"}</span>
//                       <input
//                         type="email"
//                         placeholder={t?.careersPageFormEmail || "Email"}
//                         value={emailInput}
//                         onChange={(e) => setEmailInput(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div className="sendMessageTextarea">
//                     <span>{t?.careersPageFormMessage || "Message"}</span>
//                     <textarea
//                       name="adentta"
//                       id="adentta"
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                     ></textarea>
//                     <input
//                       type="submit"
//                       value={t?.careersPageFormEnter || "Enter"}
//                     />
//                   </div>
//                 </form>
//                 {/* Status mesajları */}
//                 {submitStatus === "success" && (
//                   <p className="success-message">
//                     {t?.contactFormSuccess || "Mesaj uğurla göndərildi!"}
//                   </p>
//                 )}
//                 {submitStatus === "error" && (
//                   <p className="error-message">
//                     {t?.contactFormError || "Mesaj göndərilə bilmədi."}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="contactPageMap">
//             <ContactPageMap
//               t={t}
//               email={email}
//               locationHeadOffice={locationHeadOffice}
//               locationStore={locationStore}
//               map={map}
//             />
//           </div>
//           <ContactVideo videoUrl={videoUrl} videoTitle={videoTitle} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactUS;
//! Son versiya2





















"use client";
import React, { useState } from "react";
import ContactPageLink from "./ContactPageLink";
import ContactPageMap from "./ContactPageMap";
import ContactVideo from "./ContactVideo";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

const ContactUS = ({
  wpNumber,
  phone,
  email,
  wpLink,
  linkedin,
  instagram,
  facebook,
  workHoursMondayFriday,
  workHoursSaturday,
  map,
  videoUrl,
  locationHeadOffice,
  locationStore,
  videoTitle,
  t,
}) => {
  const [name, setName] = useState("");
  const [phoneInput, setPhoneInput] = useState(""); 
  const [emailInput, setEmailInput] = useState(""); 
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  // Formun göndərilməsi üçün funksiya
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: "Contact Form Submission", 
      key: "contact-form",
      form_data: {
        name: name,
        phone: phoneInput,
        email: emailInput,
        message: message,
      },
    };

    try {
      const response = await axiosInstance.post("/form-data/send", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSubmitStatus("success");
        // Formu təmizləyirik
        setName("");
        setPhoneInput("");
        setEmailInput("");
        setMessage("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Xəta:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <>
      <div id="contactPage">
        <div className="container">
          <div className="contactPageTop topper">
            <Link href="/">
              <h1 className="topper">Adentta</h1>
            </Link>
            <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
            <h4 className="topper">{t?.contact || "Contact"}</h4>
          </div>
          <div className="contactPageHeaderText">
            <h2>{t?.contactPageTitle || "contact infos"}</h2>
            <span>{t?.contact || "Contact"}</span>
          </div>

          <div className="contactPageLinks">
            <ContactPageLink
              t={t}
              wpNumber={wpNumber}
              phone={phone}
              email={email}
              wpLink={wpLink}
              linkedin={linkedin}
              instagram={instagram}
              facebook={facebook}
              locationHeadOffice={locationHeadOffice}
              workHoursMondayFriday={workHoursMondayFriday}
              workHoursSaturday={workHoursSaturday}
            />
          </div>

          <div className="sendMessage">
            <div className="xl-4 lg-4 md-6 sm-12">
              <div className="sendMessageText">
                <span>{t?.contactPageFormTitle || "Send Message"}</span>
                <p>{t?.contactPageFormText || "Send message Text"}</p>
              </div>
            </div>

            <div className="xl-8 lg-8 md-6 sm-12">
              <div className="sendMessageForm">
                <form onSubmit={handleSubmit}>
                  <div className="sendMessageInputs">
                    <div className="sendMessageInput">
                      <span>
                        {t?.careersPageFormNameSurname || "Name&Surname"}
                      </span>
                      <input
                        type="text"
                        placeholder={
                          t?.careersPageFormNameSurname || "Name&Surname"
                        }
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
                  </div>
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
            </div>
          </div>

          <div className="contactPageMap">
            <ContactPageMap
              t={t}
              email={email}
              locationHeadOffice={locationHeadOffice}
              locationStore={locationStore}
              map={map}
            />
          </div>
          <ContactVideo videoUrl={videoUrl} videoTitle={videoTitle} />
        </div>
      </div>
    </>
  );
};

export default ContactUS;