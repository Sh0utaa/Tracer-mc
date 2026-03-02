"use client";

import type { SessionResults } from "@/types";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DeltaPhiAngleChart({ sessionResults }: { sessionResults: SessionResults }) {
  const angles: number[] = Object.values(sessionResults).flatMap((result) => result.angles);

  const totalWW = Object.values(sessionResults).reduce((sum, result) => sum + Number(result.WW), 0);

  const binSize = 30;
  const maxAngle = 360;
  const bins = Array.from({ length: maxAngle / binSize }, (_, i) => i * binSize);
  const binLabels = bins.map((bin) => `${bin}° - ${bin + binSize}°`);

  // Count angles in each bin
  const binCounts = bins.map(
    (binStart) => angles.filter((angle) => angle >= binStart && angle < binStart + binSize).length,
  );

  const data = {
    labels: binLabels,
    datasets: [
      {
        label: "Δφ Distribution",
        data: binCounts,
        backgroundColor: "#4BC0C0",
        hoverBackgroundColor: "#4BC0C0AA",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const, // makes chart fill container height
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Δφ (degrees)",
        },
      },
      y: {
        title: {
          display: true,
          text: "WW Events",
        },
        beginAtZero: true,
        max: totalWW,
      },
    },
  };

  return (
    <div className="mx-auto mt-6 w-full max-w-4xl md:w-4/5 lg:w-2/3">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
