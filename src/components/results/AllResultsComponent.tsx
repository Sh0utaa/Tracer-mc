"use client";

import type { MasterclassSession } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { fetchSessionsByCity } from "@/actions/mc-session-actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ResultsCityInput from "./ResultsCityInput";

export default function AllResultsComponent() {
  const [sessionCity, setSessionCity] = useState("");
  const [date, setDate] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["sessionsByCity", sessionCity],
    queryFn: () => fetchSessionsByCity(sessionCity as string),
    enabled: !!sessionCity, // Fetch only when a city is selected
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-red-500 border-opacity-50"></div>
      </div>
    );
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  // Handle form submission and navigate to the results page with the session ID
  const handleSubmit = () => {
    if (selectedSessionId && date) {
      router.push(`/results/${selectedSessionId}?date=${encodeURIComponent(date)}`);
    }
  };

  // Find the session ID based on the selected date
  const handleDateChange = (selectedDate: string) => {
    const selectedSession = data.sessions.find(
      (session: MasterclassSession) =>
        new Date(session.createdAt).toLocaleDateString() === selectedDate,
    );
    if (selectedSession) {
      setSelectedSessionId(selectedSession.id);
    }
    setDate(selectedDate);
  };

  return (
    <div className="flex w-full items-center justify-center gap-4 px-44">
      <ResultsCityInput sessionCity={sessionCity} setSessionCity={setSessionCity} />
      <Select value={date} onValueChange={handleDateChange} disabled={!sessionCity}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={sessionCity ? "Select a date" : "Select a city first"} />
        </SelectTrigger>
        <SelectContent>
          {sessionCity && data.sessions.length > 0 ? (
            data.sessions.map((session: MasterclassSession) => (
              <SelectItem key={session.id} value={new Date(session.createdAt).toLocaleDateString()}>
                {new Date(session.createdAt).toLocaleDateString()}
              </SelectItem>
            ))
          ) : (
            <div className="p-2">No sessions available</div>
          )}
        </SelectContent>
      </Select>

      {/* Submit Button */}
      <Button onClick={handleSubmit} disabled={!sessionCity || !date}>
        Go to Results
      </Button>
    </div>
  );
}
