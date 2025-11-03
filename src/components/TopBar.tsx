import React, { useState } from "react";
import { Input, AutoComplete } from "antd";
import "../styles/TopBar.css";
import { fetchImagesService } from "../store/images/services";
const { Search } = Input;

interface SearchProps {
  search: (query: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ search }) => {
  const [query, setQuery] = React.useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  let timeoutId: number;

  //automatic search
  const fetchSuggestions = async (value: string) => {
    if (!value) {
      setOptions([]);
      return;
    }
    try {
      const { photos } = await fetchImagesService(value, 1);
      const suggestions: string[] = Array.from(
        new Set(
          photos
            .map((photo: any) => String(photo.alt))
            .filter((alt: string) =>
              alt?.toLowerCase().includes(value.toLowerCase())
            )
        )
      );
      setOptions(suggestions.map((s) => ({ value: s })));
    } catch (error) {
      console.error("failed to fetch suggestions", error);
    }
  };
  const handleSearch = (value: string) => {
    setQuery(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fetchSuggestions(value), 300);
  };
  const handleSelect = (value: string) => {
    setQuery(value);
    search(value); // triggers actual search
  };

  const handleSubmit = (value: string) => {
    search(value);
  };

  return (
    <div className="search-bar">
      <AutoComplete
        value={query}
        options={options}
        onSearch={handleSearch}
        onSelect={handleSelect}
        style={{ width: "100%", maxWidth: 600 }}
      >
        <Search
          placeholder="Search for an image..."
          onSearch={handleSubmit}
          enterButton="Search"
          size="large"
          allowClear
        />
      </AutoComplete>
    </div>
  );
};

export default SearchBar;
