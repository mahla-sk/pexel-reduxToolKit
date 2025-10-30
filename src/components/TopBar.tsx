import React from "react";
import { Input } from "antd";

const { Search } = Input;

interface SearchProps {
  search: (query: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ search }) => {
  const [query, setQuery] = React.useState("");

  return (
    <div className="search-bar">
      <Search
        value={query}
        placeholder="Search for an image..."
        onChange={(e) => setQuery(e.target.value)}
        onSearch={(value) => search(value)}
        enterButton="Search"
        size="large"
        style={{ maxWidth: 600, width: "100%" }}
        allowClear
      />
    </div>
  );
};

export default SearchBar;
