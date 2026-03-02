import React from "react";

import AllResultsComponent from "@/components/results/AllResultsComponent";

export default function page() {
  return (
    <div className="mt-60 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl">
          Find Your Session Results
        </h1>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl">
          Select a city and date to view the session details.
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <AllResultsComponent />
      </main>
    </div>
  );
}
