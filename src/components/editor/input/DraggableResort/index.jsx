import styles from "./style.module.css"
import React, { useState } from "react";

const DraggableResort = ({ onChange, items, onRender }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggingIndex !== null && draggingIndex !== index) {
      const newOrder = reorderItems(items, draggingIndex, index);
      onChange(newOrder);
    }
    setDraggingIndex(null);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const reorderItems = (items, oldIndex, newIndex) => {
    const reordered = [...items];
    const [movedItem] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, movedItem);
    return reordered;
  };

  return (
    <div className={styles.c}>
      {items.map((item, index) => (
        <div
          className={styles.item}
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={() => handleDrop(index)}
          onDragEnd={handleDragEnd}
          style={{
            cursor: "move",
          }}
        >
          {onRender(item, index, draggingIndex === index)}
        </div>
      ))}
    </div>
  );
};

export default DraggableResort;
