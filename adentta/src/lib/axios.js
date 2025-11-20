// lib/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid"; // Import from uuid

// Check and initialize guest UUID from cookies if it exists
let guestUUID = Cookies.get("guest_uuid");

// State to track loading (if you are not using global state management, use this approach)
let isLoading = false;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Lang: Cookies.get("NEXT_LOCALE") || "az",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  // (config) => {
  //   if (typeof window !== "undefined") {
  //     // Set a unique guest ID for guest users if not already set
  //     if (!guestUUID) {
  //       guestUUID = uuidv4(); // Generate UUID if not available
  //       Cookies.set("guest_uuid", guestUUID); // Store in cookies
  //     }
  //     config.headers["Guest-UUID"] = guestUUID;

  //     // Set language preference
  //     const NEXT_LOCALE = Cookies.get("NEXT_LOCALE") || "az";
  //     config.headers["Lang"] = NEXT_LOCALE;

  //     // Check for authorization token
  //     let token = Cookies.get("token");
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // },
  // (error) => Promise.reject(error)

  
  async (config) => {
    let lang = "az"; // Default language

    if (typeof window !== "undefined") {
      // Client-side: use js-cookie
      lang = Cookies.get("NEXT_LOCALE")||  "az";
    } else {
      // Server-side: use Next.js headers or a similar library to access cookies
      const { headers } = await import("next/headers");
      const requestHeaders = await headers(); // Access request headers in SSR
      const cookieHeader = requestHeaders.get("cookie") || "";
      const match = cookieHeader.match(/NEXT_LOCALE=([^;]*)/);
      lang = match ? decodeURIComponent(match[1]) : "az";
    }
    
    config.headers["Lang"] = lang;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Reset loading state after a successful response
    isLoading = false;
    return response;
  },
  (error) => {
    if (error.response?.status === 429) {
      // Handle 429 Too Many Requests error
      isLoading = true; // Set loading state to true
      console.log("Loading... Too Many Requests (429)");

      // Retry logic (optional) or fallback
      return new Promise((resolve) => {
        setTimeout(() => {
          isLoading = false; // Reset loading after some delay
          resolve(axiosInstance.request(error.config)); // Retry the request
        }, 3000); // Adjust delay time as necessary
      });
    }

    isLoading = false; // Reset loading state for other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;