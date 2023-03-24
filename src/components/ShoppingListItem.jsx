import classes from "./ShoppingListItem.module.css";

export const ShoppingListItem = ({ item, onRemove, onToggle }) => {
  const handleRemove = () => {
    onRemove(item.id);
  };

  const handleToggle = () => {
    onToggle(item.id);
  };

  return (
    <div className="flex items-center p-2">
      <input
        type="checkbox"
        className="mr-2"
        checked={item && item.checked}
        onChange={handleToggle}
      />

      <h3
        className={`flex-1 ${item.checked ? classes.checked : ""}`}
        style={{ textDecoration: item.checked ? "line-through" : "none" }}
      >
        {item && item.name}
      </h3>
      <button className={classes.removeButton} onClick={handleRemove}>
        x
      </button>
    </div>
  );
};
