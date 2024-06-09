"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "@/shared/images/search-icon";
import { Close } from "@/shared/images/close";

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

const dict = ["Машина", "Маша и медведь", "Огонь"];

const Suggestions = (props: {
  value: string;
  onSelect?: (suggestion: string) => void;
}) => {
  const { value } = props;

  const frozen = useRef(false);

  const [show, setShow] = useState(false);

  const suggestions = useMemo(() => {
    if (!value) {
      return [];
    }
    return dict.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
  }, [value]);

  useEffect(() => {
    if (frozen.current) {
      frozen.current = false;
      return;
    }
    setShow(true);
  }, [value]);

  if (!show) {
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
            setShow(false);
          }}
        >
          {item}
        </SuggestionItem>
      ))}
    </div>
  );
};

const SearchBar = () => {
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <div className="bg-secondary  h-[3rem] rounded-[0.75rem] py-[0.75rem] gap-[0.75rem] px-[0.875rem] flex items-center">
        <div className="text-accent w-[16px] h-[16px]">
          <SearchIcon />
        </div>
        <Input
          value={value}
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
          value={value}
          onSelect={(suggestion) => setValue(suggestion)}
        />
      </div>
    </div>
  );
};

export { SearchBar };
