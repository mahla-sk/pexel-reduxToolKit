import React from "react";

interface searchProps {
  search: (query: string) => void;
}

const SearchBar: React.FC<searchProps> = ({ search }) => {
  const [query, setQuery] = React.useState("");
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="search for an image..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            search(query);
          }
        }}
      />
      <button onClick={() => search(query)}>Search</button>
    </div>
  );
};

export default SearchBar;
