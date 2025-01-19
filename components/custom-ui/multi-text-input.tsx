"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextInputProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
export const MultiTextInput: React.FC<MultiTextInputProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (item: string) => {
    onChange(item);
    setInputValue("");
  }
  return (
    <>
    <Input
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
            e.preventDefault();
          addTag(e.currentTarget.value);
        }
      }}
    />
    <div className="flex gap-1 flex-wrap mt-4">
      {value.map((tag, index) => (
        <Badge key={index} className="bg-grey-1 text-white" >
          {tag}
          <Button className="ml-1 rounded-full outline-none hover:bg-red-1 " size="sm" onClick={() => onRemove(tag)}>
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      ))}
    </div>
    </>
  );
};
