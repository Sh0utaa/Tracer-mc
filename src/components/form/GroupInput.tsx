"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GroupInputProps = {
  value: string;
  onChange: (value: string) => void;
};
export function GroupInput({ value, onChange }: GroupInputProps) {
  // Extract the group number from the value (e.g., "1A" -> "1")
  const [groupNumber, setGroupNumber] = useState(value.replace(/\D/g, ""));
  // Handle group number change
  const handleGroupChange = (groupValue: string) => {
    setGroupNumber(groupValue);
  };
  // Update the subgroup value when the group number changes
  useEffect(() => {
    // Extract the current letter from the value (e.g., "1A" -> "A")
    const currentLetter = value.replace(/\d+/g, "");
    // Check if the current letter is valid for the new group
    const isValidLetter = /^[A-Z]$/.test(currentLetter);
    // If the letter is valid, keep it; otherwise, default to "A"
    const newSubgroup = groupNumber + (isValidLetter ? currentLetter : "A");
    // Only call onChange if the new subgroup is different from the current value
    if (newSubgroup !== value) {
      onChange(newSubgroup);
    }
  }, [groupNumber, value, onChange]);
  return (
    <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
      <span className="hidden text-[17px] font-medium">Group</span>

      <Select value={groupNumber} onValueChange={handleGroupChange}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder={groupNumber} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={i + 1} value={i + 1 + ""}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={value} disabled={!groupNumber} onValueChange={onChange}>
        <div className="align-start flex">
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder={value} />
          </SelectTrigger>
        </div>
        <SelectContent>
          {Array.from({ length: 20 }, (_, i) => `${groupNumber}${String.fromCharCode(65 + i)}`).map(
            (group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
