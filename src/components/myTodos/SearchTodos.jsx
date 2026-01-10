import { useState } from "react";
import GeneralSearch from "../GeneralSearch";

function SearchTodos({ todos, onFilter }) {

  const showCompleted = () => {
    const filtered = todos.filter(t => t.completed === true);
    onFilter(filtered);
  };

  const showNotCompleted = () => {
    const filtered = todos.filter(t => t.completed === false);
    onFilter(filtered);
  };
  
  return (
    <>
      <GeneralSearch items={todos} onFilter={onFilter} />

      <div>
        <button onClick={showCompleted}>completed</button>
        <button onClick={showNotCompleted} >
          not completed 
        </button>
      </div>
    </>
  );
}

export default SearchTodos;
