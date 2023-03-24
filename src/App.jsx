import { useState } from "react";
import "./App.css";
import { ShoppingListItem } from "./components/ShoppingListItem";

function App() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (!newItem.trim()) return; // Prevent empty string
    if (list.find((item) => item.name === newItem.trim())) {
      alert("Item already exists"); // Prevent duplicates
      return;
    }
    setList([
      ...list,
      { id: Date.now(), name: newItem.trim(), checked: false },
    ]);
    setNewItem("");
  };

  const handleRemove = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const handleToggle = (id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleAdd();
    }
  };
  return (
    <div className="container">
      <h1 className="mb-4">My Shopping List</h1>

      <div className="flex gap-4 pb-3 border-b-2 border-gray-700">
        <input
          type="text"
          placeholder="E.g. Carrots"
          className="v__input flex-1"
          value={newItem}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button
          className="v__button"
          onClick={handleAdd}
          disabled={!newItem.trim()}
        >
          Add
        </button>
      </div>
      <div className="v__list-container overflow-y-scroll">
        {/* Map your data here: */}
        {list.map((item) => (
          <ShoppingListItem
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
