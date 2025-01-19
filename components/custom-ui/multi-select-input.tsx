"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";

interface MultiSelectInputProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  console.log("Collections passed to MultiSelectInput:", collections);
  console.log("Value in MultiSelectInput:", value);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // Filter collections based on user input
  const filteredCollections = (collections || []).filter((collection) =>
    collection.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <Command className="overflow-visible bg-white">
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={(value) => {
            setInputValue(value);
            setOpen(true); // Open the dropdown when typing
          }}
          onBlur={() => setTimeout(() => setOpen(false), 150)} // Delay closing
          onFocus={() => setOpen(true)}
        />
        <div className="relative mt-2">
          {open && (
            <CommandGroup className="absolute w-full z-10 bg-white rounded-md shadow-md max-h-40 overflow-auto">
              {filteredCollections.length > 0 ? (
                filteredCollections.map((collection) => (
                  <CommandItem
                    key={collection._id}
                    onSelect={() => {
                      // Avoid adding duplicates
                      if (!value.includes(collection._id)) {
                        onChange(collection._id);
                      }
                      setInputValue(""); // Clear input
                    }}
                  >
                    {collection.title}
                  </CommandItem>
                ))
              ) : (
                <p className="px-2 py-1 text-gray-500">No collections found</p>
              )}
            </CommandGroup>
          )}
        </div>
      </Command>
      {/* Render selected collections */}
      <div className="mt-2 flex flex-wrap gap-2">
        {(value || []).map((selectedId) => {
          const selectedCollection = collections?.find(
            (collection) => collection._id === selectedId
          );
          return (
            selectedCollection && (
              <div
                key={selectedId}
                className="flex items-center bg-gray-200 px-2 py-1 rounded-md"
              >
                <span>{selectedCollection.title}</span>
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => onRemove(selectedId)}
                >
                  ×
                </button>
              </div>
            )
          );
        })}
      </div>
      
    </div>
  );
};

export default MultiSelectInput;
