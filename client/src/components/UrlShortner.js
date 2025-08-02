import React, { useState } from "react";
import axios from "axios";

const UrlShortner = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [validity, setValidity] = useState(5); // Default: 5 minutes

  const handleShorten = async () => {
    try {
      const response = await axios.post("/shorturls", {
        url: originalUrl,
        validity,
      });
      setShortUrl(response.data.shortLink);
    } catch (err) {
      console.error("Error shortening URL:", err);
      alert("Something went wrong while shortening the URL.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter long URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      
      <select
        value={validity}
        onChange={(e) => setValidity(Number(e.target.value))}
        style={{ marginLeft: "10px", padding: "8px" }}
      >
        <option value={5}>5 mins</option>
        <option value={15}>15 mins</option>
        <option value={30}>30 mins</option>
        <option value={60}>1 hour</option>
      </select>

      <button onClick={handleShorten} style={{ marginLeft: "10px", padding: "8px" }}>
        Shorten
      </button>

      {shortUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortner;
