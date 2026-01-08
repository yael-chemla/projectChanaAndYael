import { useState } from "react";

function GeneralSearch({ items, onFilter }) {
  const [query, setQuery] = useState("");

  const showAll = () => {
    onFilter(items);
  };

  const searchById = () => {
    const q = query.trim();
    if (!q) return;

    const filtered = items.filter(t => t.id.toString() === q);
    onFilter(filtered);
  };

  const searchByTitle = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const filtered = items.filter(t =>
      t.title.toLowerCase().includes(q)
    );
    onFilter(filtered);
  };

  return (
    <div className="general-search">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="search-buttons">
        <button onClick={searchById}>By ID</button>
        <button onClick={searchByTitle}>By Title</button>
      </div>

      <button className="show-all" onClick={showAll}>Show All</button>
    </div>

  );
}

export default GeneralSearch;
