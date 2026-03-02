"use client";

import type { MasterclassSession, TotalResults } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchSession } from "@/actions/mc-session-actions";
import ResultsTable from "@/components/results/ResultsTable";
import { Input } from "@/components/ui/input";

import DownloadResultsButton from "./DownloadResultsButton";
import EventRatioChart from "./EventRatioChart";
import PhiAngleChart from "./PhiAngleChart";

export default function ResultComponent({ sessionID }: { sessionID: string }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["session", sessionID],
    queryFn: () => fetchSession(sessionID),
    enabled: !!sessionID,
  });

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-red-500 border-opacity-50"></div>
      </div>
    );
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const session: MasterclassSession = data.session;

  const filteredResults = Object.entries(session.sessionResults).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const totalResults: TotalResults = {
    electron: 0,
    positron: 0,
    muon: 0,
    antimuon: 0,
    background: 0,
    WW: 0,
  };

  Object.values(session.sessionResults).forEach((value) => {
    totalResults.electron += Number(value.electron);
    totalResults.positron += Number(value.positron);
    totalResults.muon += Number(value.muon);
    totalResults.antimuon += Number(value.antimuon);
    totalResults.background += Number(value.background);
    totalResults.WW += Number(value.WW);
  });

  const tableID = "resultsTable";
  const fileName = `${session.city}_${new Date(session.createdAt).toISOString().split("T")[0]}`;

  return (
    <div className="flex flex-col items-center gap-6 p-4 sm:p-6 lg:p-10">
      {/* Title */}
      <h1 className="text-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
        {session.city + " " + new Date(session.createdAt).toLocaleDateString()}
      </h1>

      {/* Search + Download */}
      <div className="flex w-full items-center justify-between gap-3">
        <Input
          placeholder="Search... "
          className="w-[50%] sm:w-40"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <DownloadResultsButton tableID={tableID} fileName={fileName} />
      </div>

      {/* Results Table */}
      <ResultsTable totalResults={totalResults} results={Object.fromEntries(filteredResults)} />

      {/* Charts */}
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-10 lg:px-10">
        <EventRatioChart eventCounts={totalResults} />
        <PhiAngleChart sessionResults={session.sessionResults} />
      </div>
    </div>
  );
}
