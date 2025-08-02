import React, { useState, useEffect } from "react";
import axios from "axios";

const StatsViewer = () => {
  const [shortCode, setShortCode] = useState("");
  const [statsData, setStatsData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!shortCode.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/shorturls/${shortCode}`);
      setStatsData(response.data);
      setErrorMsg("");
    } catch (err) {
      setStatsData(null);
      setErrorMsg("No stats available or the link has expired.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (shortCode.trim()) {
        fetchStats();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [shortCode]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <input
        type="text"
        placeholder="Enter your shortcode (e.g., xyz123)"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />
      <button
        onClick={fetchStats}
        style={{ marginLeft: "10px", padding: "8px" }}
      >
        View Stats
      </button>

      {loading && <p>Loading stats...</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      {statsData && (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Original URL:</strong> {statsData.originalUrl}</p>
          <p><strong>Total Clicks:</strong> {statsData.totalVisits}</p>
          <p><strong>Created On:</strong> {new Date(statsData.createdAt).toLocaleString()}</p>
          <p><strong>Expires On:</strong> {new Date(statsData.expiry).toLocaleString()}</p>
          <h4>Click Logs:</h4>
          {statsData.logs.length > 0 ? (
            <ul>
              {statsData.logs.map((entry, index) => (
                <li key={index}>
                  {new Date(entry.time).toLocaleString()} — {entry.referrer} — {entry.ip}
                </li>
              ))}
            </ul>
          ) : (
            <p>No clicks recorded yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsViewer;
