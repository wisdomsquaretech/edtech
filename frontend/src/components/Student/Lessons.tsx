import React, { useState } from "react";

const Lessons = () => {
  const [tab, setTab] = useState("upcoming");

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 flex">
        {["upcoming", "past", "materials"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-4 font-medium text-sm focus:outline-none transition-colors ${
              tab === t
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="p-6">
        <p className="text-gray-500">Display content for "{tab}" tab here...</p>
      </div>
    </section>
  );
};

export default Lessons;