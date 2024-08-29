// src/components/SearchBar.tsx
import React from "react";
import { Input } from "@chakra-ui/react";

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch }) => {
  return (
    <Input
      placeholder="Search manufacturers..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
      mb={4}
    />
  );
};

export default SearchBar;
