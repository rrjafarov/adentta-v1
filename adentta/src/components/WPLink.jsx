import { useRef, useState, useEffect } from "react";

const WpLink = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  const message = encodeURIComponent(
    Salam, bu məhsul haqqında məlumat ala bilərəm?: ${currentUrl}
  );
  const whatsappLink = https://wa.me/${+994000000000}?text=${message};

  return (
    <Link href={whatsappLink} className="wpButton">
      Whatsapp
    </Link>
  );
};

export default WpLink;