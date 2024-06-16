"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "@/shared/images/search-icon";
import { Close } from "@/shared/images/close";
import { useFetchDzenSuggestions, useSearchVideos } from "@/lib/hooks";
import { useVideosProvider } from "@/lib/providers";

const SuggestionItem = (props: {
  children: string;
  onClick?: (suggestion: string) => void;
}) => {
  return (
    <button
      onClick={() => props.onClick?.(props.children)}
      className="px-[0.875rem] py-[0.25rem]
hover:text-accent text-left
  "
    >
      {props.children}
    </button>
  );
};

const Suggestions = (props: {
  value: string;
  onSelect?: (suggestion: string) => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { value } = props;

  const frozen = useRef(true);

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  const { suggestions } = useFetchDzenSuggestions(debouncedValue);

  useEffect(() => {
    if (frozen.current) {
      frozen.current = false;
      return;
    }
    props.setShow(true);
  }, [value]);

  if (!props.show) {
    return null;
  }

  if (!suggestions.length) {
    return null;
  }

  return (
    <div className="bg-secondary flex flex-col rounded-[0.75rem] py-[1rem]">
      {suggestions.map((item) => (
        <SuggestionItem
          key={item}
          onClick={(suggestion) => {
            props.onSelect?.(suggestion);
            frozen.current = true;
            props.setShow(false);
          }}
        >
          {item}
        </SuggestionItem>
      ))}
    </div>
  );
};

const SearchBar = (props: { children?: React.ReactNode }) => {
  const { searchString, setSearchString } = useVideosProvider();
  const [value, setValue] = useState(searchString);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setShowSuggestions(false);
      setSearchString(value);
    }
  };

  return (
    <div className="relative max-w-[36rem] mx-auto">
      <div className="bg-secondary  h-[3rem] rounded-[0.75rem] py-[0.75rem] gap-[0.75rem] px-[0.875rem] flex items-center">
        <div className="text-accent w-[16px] h-[16px]">
          <SearchIcon />
        </div>
        <Input
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Поиск"
          className="border-0 bg-secondary rounded-l-none p-0"
        />
        {value.length > 0 && (
          <button onClick={() => setValue("")}>
            <Close />
          </button>
        )}
      </div>
      <div
        style={{
          transform: "translateY(100%)",
        }}
        className="absolute -bottom-[0.5rem] w-full z-10"
      >
        <Suggestions
          show={showSuggestions}
          setShow={setShowSuggestions}
          value={value}
          onSelect={(suggestion) => {
            setValue(suggestion);
            setSearchString(suggestion);
          }}
        />
      </div>
    </div>
  );
};

export { SearchBar };
