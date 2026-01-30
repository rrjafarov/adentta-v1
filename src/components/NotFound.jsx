
import React from "react";
import Link from "next/link";

const NotFound = ({t}) => {
  // Container için style
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "2rem",
  };

  // Span için style
  const spanStyle = {
    fontSize: "16rem",
    color: "#293881",
    fontWeight: "600",
    fontFamily: '"Nunito", sans-serif' ,
  };

  // Strong için style
  const strongStyle = {
    fontSize: "2rem",
    color: "#2273EC",
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "0.08rem",
    textTransform: "uppercase",
    fontFamily: '"Nunito", sans-serif',
  };

  // Button için style
  const buttonStyle = {
    width: "25.3498rem",
    fontFamily: '"Nunito", sans-serif',
    height: "3.7406rem",
    flexShrink: 0,
    borderRadius: "3rem",
    background: "#293880",
    color: "#fff",
    border: "none",
    fontSize: "1.6rem",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  };

  return (
    <>
    <div
      style={{
        display: "flex",
        width: "100%",
        fontFamily: '"Nunito", sans-serif',
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={containerStyle}>
        <span style={spanStyle}>404</span>
        <strong style={strongStyle}>{t?.pageNotFound || "Page Not Found"}</strong>
        <Link href="/" style={buttonStyle}>
          {t?.backToHome || "Back to Home"}
        </Link>
      </div>
    </div>
    </>
  );
};

export default NotFound;
