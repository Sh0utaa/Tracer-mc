"use client";

import React from "react";

import { Input } from "@/components/ui/input";

type ProblemRadioInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ProblemRadioInput({ value, onChange }: ProblemRadioInputProps) {
  return (
    <div className="w-18 flex items-center justify-around rounded-3xl bg-[#0b034d] p-2 md:w-24">
      <label
        className={`text-10px cursor-pointer rounded-full px-3 py-1 font-bold md:text-[16px] ${
          value === "W" ? "bg-[#ec6d6d] text-white" : "text-white"
        }`}
      >
        <Input
          type="radio"
          value="W"
          checked={value === "W"}
          onChange={() => onChange("W")}
          className="hidden"
        />
        W
      </label>
      <label
        className={`text-10px cursor-pointer rounded-full px-3 py-1 font-bold md:text-[16px] ${
          value === "Z" ? "bg-[#ec6d6d] text-white" : "text-white"
        }`}
      >
        <Input
          type="radio"
          value="Z"
          checked={value === "Z"}
          onChange={() => onChange("Z")}
          className="hidden"
          disabled
        />
        Z
      </label>
    </div>
  );
}
