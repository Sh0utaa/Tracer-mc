"use client";

import type { TotalResults } from "@/types";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EventRatioChart({ eventCounts }: { eventCounts: TotalResults }) {
  const labels = ["e⁺+ν", "e⁻+ν", "μ⁺+ν", "μ⁻+ν", "Background", "WW"];

  const data = {
    labels,
    datasets: [
      {
        label: "Event Ratios",
        data: [
          eventCounts.positron,
          eventCounts.electron,
          eventCounts.antimuon,
          eventCounts.muon,
          eventCounts.background,
          eventCounts.WW,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        hoverBackgroundColor: [
          "#FF6384AA",
          "#36A2EBAA",
          "#FFCE56AA",
          "#4BC0C0AA",
          "#9966FFAA",
          "#FF9F40AA",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const, // allows it to stretch inside container
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 12,
          padding: 8,
        },
      },
    },
  };

  return (
    <div className="mt-6 h-80 w-full max-w-md">
      <Pie data={data} options={options} />
    </div>
  );
}
