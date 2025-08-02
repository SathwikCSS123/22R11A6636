import React from "react";
import UrlShortner from "./components/UrlShortner";
import StatsViewer from "./components/StatsViewer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center p-6 font-[Poppins]">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 mt-12">
        <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6 flex items-center justify-center gap-3">
          <span>🔗</span> Smart Link Shortener
        </h1>
        <div className="bg-gray-50 rounded-xl p-5 shadow hover:shadow-lg transition-all duration-300 mb-6">
          <UrlShortner />
        </div>
        <div className="bg-gray-50 rounded-xl p-5 shadow hover:shadow-lg transition-all duration-300">
          <StatsViewer />
        </div>
      </div>
    </div>
  );
}

export default App;
