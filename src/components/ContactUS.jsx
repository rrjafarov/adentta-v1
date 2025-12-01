"use client";
import React, { useState, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const errorLabelStyle = { color: "#ff0000" };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = phoneInput.replace(/\D/g, "");

    if (!name.trim()) newErrors.name = "Ad/Soyad məcburidir.";
    if (!phoneInput.trim()) newErrors.phone = "Telefon nömrəsi məcburidir.";
    else if (phoneDigits.length < 9)
      newErrors.phone = "Telefon nömrəsi düzgün formatda deyil.";
    if (!emailInput.trim()) newErrors.email = "Email məcburidir.";
    else if (!emailRegex.test(emailInput))
      newErrors.email = "Email düzgün formatda deyil.";
    if (!message.trim()) newErrors.message = "Mesaj bölməsi məcburidir.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const foundErrors = validateForm();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setIsLoading(true);

    const fd = new FormData();
    fd.append("key", "contact-form");
    fd.append("title", name || "Contact Form");
    fd.append(
      "form_data",
      JSON.stringify({
        message: message,
        phone: phoneInput,
        email: emailInput,
      })
    );

    try {
      const response = await axiosInstance.post("/form-data/send", fd);
      if (response.status === 200) {
        setSubmitStatus("success");
        setName("");
        setPhoneInput("");
        setEmailInput("");
        setMessage("");
        setErrors({});
      } else setSubmitStatus("error");
    } catch (error) {
      console.error("Xəta:", error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 🔹 Spinner animasiyası üçün */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div id="contactPage">
        <div className="container">
          <div className="contactPageTop topper">
            <Link href="/">
              <strong className="topper">Adentta</strong>
            </Link>
            <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
            <span className="topper">{t?.contact || "Contact"}</span>
          </div>

          <div className="contactPageHeaderText">
            <span>{t?.contactPageTitle || "contact infos"}</span>
            <h1>{t?.contact || "Contact"}</h1>
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
                <h2>{t?.contactPageFormTitle || "Send Message"}</h2>
                <p>{t?.contactPageFormText || "Send message Text"}</p>
              </div>
            </div>

            <div className="xl-8 lg-8 md-6 sm-12">
              <div className="sendMessageForm">
                <form onSubmit={handleSubmit}>
                  <div className="sendMessageInputs">
                    <div className="sendMessageInput">
                      <span style={errors.name ? errorLabelStyle : undefined}>
                        {errors.name || t?.careersPageFormNameSurname || "Name&Surname"}
                      </span>
                      <input
                        ref={nameRef}
                        type="text"
                        placeholder={t?.careersPageFormNameSurname || "Name&Surname"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="sendMessageInput">
                      <span style={errors.phone ? errorLabelStyle : undefined}>
                        {errors.phone || t?.careersPageFormPhone || "Phone"}
                      </span>
                      <input
                        ref={phoneRef}
                        type="text"
                        placeholder="+994 00 000 00 00"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                      />
                    </div>
                    <div className="sendMessageInput">
                      <span style={errors.email ? errorLabelStyle : undefined}>
                        {errors.email || t?.careersPageFormEmail || "Email"}
                      </span>
                      <input
                        ref={emailRef}
                        type="email"
                        placeholder={t?.careersPageFormEmail || "Email"}
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>
                  </div>

                  <div
                    className="sendMessageTextarea"
                    style={{ position: "relative" }}
                  >
                    <span style={errors.message ? errorLabelStyle : undefined}>
                      {errors.message ||
                        t?.careersPageFormMessage ||
                        "Message"}
                    </span>
                    <textarea
                      ref={messageRef}
                      name="adentta"
                      id="adentta"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    {/* 🔹 Spinner "Göndər" düyməsinin ortasında fırlanır */}
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "100%",
                      }}
                    >
                      <input
                        type="submit"
                        value={t?.careersPageFormEnter || "Göndər"}
                        disabled={isLoading}
                        style={{
                          color: isLoading ? "transparent" : "#fff",
                          transition: "color 0.2s ease",
                          cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                      />
                      {isLoading && (
                        <div
                          style={{
                            position: "absolute",
                            top: "65%",
                            left: "50%",
                            marginTop: "-15px",
                            marginLeft: "-12px",
                            width: "24px",
                            height: "24px",
                            border: "3px solid rgba(255,255,255,0.3)",
                            borderTopColor: "#fff",
                            borderRadius: "50%",
                            animation: "spin 0.8s linear infinite",
                            pointerEvents: "none",
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                </form>
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

