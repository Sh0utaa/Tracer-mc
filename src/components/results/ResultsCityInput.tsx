"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type ResultsCityInputProps = {
  sessionCity: string;
  setSessionCity: (city: string) => void;
};

export default function ResultsCityInput({ sessionCity, setSessionCity }: ResultsCityInputProps) {
  const [cityList, setCityList] = React.useState<string[]>([]);
  const { error, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await fetch("/api/mc-cities");
      const result = await response.json();
      setCityList(result.cities);
      return result;
    },
  });

  if (error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <Select value={sessionCity} onValueChange={setSessionCity}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {isLoading ? (
          <SelectItem value="loading">Loading...</SelectItem>
        ) : (
          cityList.sort().map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
