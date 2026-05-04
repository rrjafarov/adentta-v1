"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

const CareersCV = ({ t }) => {
  const fileInputRef = useRef(null);

  // Form state dəyişənləri
  const [name, setName] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Refs for focus management
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const cvButtonRef = useRef(null);

  // Error styling
  const errorLabelStyle = { color: "#ff0000" };
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

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = phoneInput.replace(/\D/g, "");

    if (!name.trim()) {
      newErrors.name = t?.validationNameRequired || "Ad/Soyad məcburidir.";
    }

    if (!phoneInput.trim()) {
      newErrors.phone = t?.validationPhoneRequired || "Telefon nömrəsi məcburidir.";
    } else if (phoneDigits.length < 9) {
      newErrors.phone = t?.validationPhoneInvalid || "Telefon nömrəsi düzgün formatda deyil.";
    }

    if (!emailInput.trim()) {
      newErrors.email = t?.validationEmailRequired || "Email məcburidir.";
    } else if (!emailRegex.test(emailInput)) {
      newErrors.email = t?.validationEmailInvalid || "Email düzgün formatda deyil.";
    }

    if (!message.trim()) {
      newErrors.message = t?.validationMessageRequired || "Mesaj bölməsi məcburidir.";
    }

    if (!selectedFile) {
      newErrors.cv = t?.validationCVRequired || "CV faylı seçilməlidir.";
    }

    return newErrors;
  };

  // Phone input handler
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Əgər +994 ilə başlayırsa, onu çıxarırıq
    if (value.startsWith("+994 ")) {
      value = value.slice(5);
    } else if (value.startsWith("+994")) {
      value = value.slice(4);
    } else if (value.startsWith("994")) {
      value = value.slice(3);
    }
    
    // Yalnız rəqəmləri saxlayırıq
    let digits = value.replace(/\D/g, "");
    
    // Maksimum 9 rəqəm
    digits = digits.slice(0, 9);
    
    setPhoneInput(digits);
    
    // Xəta varsa təmizlə
    if (errors.phone && digits.length >= 9) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  // File input açma
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // File seçildiğində
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Fayl növünü yoxla (PDF və ya DOCX)
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          cv: t?.validationCVInvalidType || "Yalnız PDF və ya DOCX faylları qəbul edilir.",
        }));
        return;
      }

      // Fayl ölçüsünü yoxla (məs. 10MB)
      const maxSize = 10 * 1024 * 1024; 
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          cv: t?.validationCVTooLarge || "Fayl ölçüsü 10MB-dan çox ola bilməz.",
        }));
        return;
      }

      setSelectedFile(file);
      // Xəta varsa təmizlə
      if (errors.cv) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.cv;
          return newErrors;
        });
      }
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Validasiya
    const foundErrors = validateForm();
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      // İlk səhv sahəyə focus
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
      return;
    }

    setIsLoading(true);

    // FormData hazırlayırıq
    const formData = new FormData();
    formData.append("key", "hr");
    formData.append("title", name);

    // form_data JSON string olaraq
    const formDataJson = {
      name: name,
      phone: "+994" + phoneInput,
      email: emailInput,
      message: message,
    };
    formData.append("form_data", JSON.stringify(formDataJson));

    // ⚠️ DİQQƏT: Backend-də cv_file adı ilə gözləyir
    if (selectedFile) {
      formData.append("cv_file", selectedFile);
    }

    try {
      const response = await axiosInstance.post("/form-data/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus("success");
        // Formu təmizlə
        setName("");
        setPhoneInput("");
        setEmailInput("");
        setMessage("");
        setSelectedFile(null);
        setErrors({});
        setIsPhoneFocused(false);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form göndərilmədi:", error);
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
                      {errors.name || t?.careersPageFormNameSurname || "Name/Surname"}
                    </span>
                    <input
                      ref={nameRef}
                      type="text"
                      placeholder={t?.careersPageFormNameSurname || "Name/Surname"}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name && e.target.value.trim()) {
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.name;
                            return newErrors;
                          });
                        }
                      }}
                      aria-invalid={Boolean(errors.name)}
                    />
                  </div>

                  {/* PHONE */}
                  <div className="sendMessageInput" style={{ position: "relative" }}>
                    <span style={errors.phone ? errorLabelStyle : undefined}>
                      {errors.phone || t?.careersPageFormPhone || "Phone"}
                    </span>
                    <input
                      ref={phoneRef}
                      type="text"
                      placeholder="+994 00 000 00 00"
                      value={isPhoneFocused || phoneInput ? "+994 " + phoneInput : ""}
                      onFocus={() => setIsPhoneFocused(true)}
                      onBlur={() => {
                        if (!phoneInput) setIsPhoneFocused(false);
                      }}
                      onChange={handlePhoneChange}
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="sendMessageInput" style={{ position: "relative" }}>
                    <span style={errors.email ? errorLabelStyle : undefined}>
                      {errors.email || t?.careersPageFormEmail || "Email"}
                    </span>
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder={t?.careersPageFormEmail || "Email"}
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.email;
                            return newErrors;
                          });
                        }
                      }}
                      aria-invalid={Boolean(errors.email)}
                    />
                  </div>

                  {/* CV BUTTON */}
                  <div className="downCV" style={{ position: "relative" }}>
                    <button
                      ref={cvButtonRef}
                      type="button"
                      className="downloadCV"
                      onClick={handleButtonClick}
                      aria-invalid={Boolean(errors.cv)}
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
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                    {errors.message || t?.careersPageFormMessage || "Message"}
                  </span>
                  <textarea
                    ref={messageRef}
                    name="adentta"
                    id="adentta"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message && e.target.value.trim()) {
                        setErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.message;
                          return newErrors;
                        });
                      }
                    }}
                    aria-invalid={Boolean(errors.message)}
                  ></textarea>

                  {/* SUBMIT BUTTON with Spinner */}
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
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
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

                  {/* SUCCESS MESSAGE */}
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

                  {/* ERROR MESSAGE */}
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
    </>
  );
};

export default CareersCV;