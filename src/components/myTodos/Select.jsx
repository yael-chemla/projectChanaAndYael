import { useState } from "react";

function Select({ todos, onFilter }) {
  const [sortBy, setSortBy] = useState("id");

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);

    const sortedTodos = [...todos].sort((a, b) => {
      if (newSort === "title") {
        return a.title.localeCompare(b.title);
      }
      if (newSort === "completed") {
        return Number(a.completed) - Number(b.completed);
      }
      return a.id - b.id;
    });

    onFilter(sortedTodos); 
  };

  return (
    <label>
      מיין לפי:{" "}
      <select value={sortBy} onChange={handleSortChange}>
        <option value="id">ID</option>
        <option value="title">כותרת</option>
        <option value="completed">מצב ביצוע</option>
      </select>
    </label>
  );
}

export default Select;
