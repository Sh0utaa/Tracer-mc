"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type CityDateInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const formatCity = (city: string) => {
  city = city.toLowerCase();

  if (city.includes("-")) {
    return city
      .split("-")
      .map((c) => c[0].toUpperCase() + c.slice(1))
      .join("-");
  } else if (city.includes("_")) {
    return city
      .split("_")
      .map((c) => c[0].toUpperCase() + c.slice(1))
      .join("_");
  } else if (city.includes(" ")) {
    return city
      .split(" ")
      .map((c) => c[0].toUpperCase() + c.slice(1))
      .join(" ");
  }

  return city[0].toUpperCase() + city.slice(1);
};

export function CitiesInput({ value, onChange }: CityDateInputProps) {
  const [open, setOpen] = React.useState(false);
  const [cityList, setCityList] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const { error, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await fetch("/api/mc-cities");
      const result = await response.json();
      setCityList(result.cities);
      return result;
    },
  });

  const handleAddCity = () => {
    if (!inputValue) {
      return;
    }
    const formatedInputValue = formatCity(inputValue);
    if (!cityList.includes(formatedInputValue)) {
      // Add the new city to the list and auto-select it
      setCityList((prev) => [...prev, formatedInputValue]);
      onChange(formatedInputValue);
      setOpen(false);
    }
  };

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value ? cityList.find((city) => city === value) : "Select City..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder="Search or add your city..."
            value={inputValue}
            onValueChange={(val) => setInputValue(val)}
          />
          <CommandList>
            <CommandEmpty>No cities found.</CommandEmpty>
            <CommandGroup>
              {isLoading ? (
                <CommandItem>Loading...</CommandItem>
              ) : (
                cityList.map((city) => (
                  <CommandItem
                    key={city}
                    value={city}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", value === city ? "opacity-100" : "opacity-0")}
                    />
                    {city}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
          <div className="p-2">
            <Button
              className="w-full"
              variant="outline"
              onClick={handleAddCity}
              disabled={!inputValue.trim()}
            >
              Add &quot;{inputValue}&quot; as a new city
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
