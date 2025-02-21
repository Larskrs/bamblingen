import classNames from "classnames";
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";

const DraggableResort = ({ onChange, disabled,  items, onRender, forceDraggable=false }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [draggingOverIndex, setDraggingOverIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePos = (e) => {
        if (disabled) {return;}
        setMousePosition({ x: e.clientX, y: e.clientY }); 
    }
  
      window.addEventListener("dragover", updateMousePos);
    
  
    return () => {
      window.removeEventListener("dragover", updateMousePos);
    };
  }, [draggingIndex]);

  const handleDragStart = (e, index) => {
      if (disabled) {return;}
      setDraggingIndex(index);

      // Hide default drag preview
      e.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (disabled) {return;}

    setDraggingOverIndex(index)
  };

  const handleDrop = (index) => {
    if (disabled) {return;}
    
    if (draggingIndex !== null && draggingIndex !== index) {
      const newOrder = reorderItems(items, draggingIndex, index);
      onChange(newOrder);
    }
    setDraggingIndex(null);
    setDraggingOverIndex(null)
  };

  const handleDelete = (e) => {
    e.preventDefault()
    if (disabled) {return;}

    if (draggingIndex === null) {
      return;
    }

    const newItems = items.filter((item, index) => index !== draggingIndex)
    onChange(newItems)
    setDraggingIndex(null);
    setDraggingOverIndex(null)
  }

  const handleDragEnd = (e, index) => {
    if (disabled) {return;}
    setDraggingIndex(null);
    setDraggingOverIndex(null)
  };

  const reorderItems = (items, oldIndex, newIndex) => {
    if (disabled) {return;}
    const reordered = [...items];
    const [movedItem] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, movedItem);
    return reordered;
  };

  return (
    <>
        <div className={styles.c}>
          {items.map((item, index) => (
            <div
            className={classNames(
              styles.item,
              !disabled && draggingIndex == index ? styles.dragging : "",
              !disabled && draggingOverIndex == index ? styles.draggingOver : ""
            )}
            key={index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={(e) => handleDragEnd(e, index)}
            >
              {onRender(item, index, draggingIndex === index)}
            </div>
          ))}
          {/* Delete Item */}
          
          {!disabled && <div
            onDrop={handleDelete}
            onDragOver={(e) => handleDragOver(e, draggingIndex)}
            className={styles.delete}
            style={{
                height: draggingIndex !== null ? "3.5rem" : "0rem",
                opacity: draggingIndex !== null ? 1 : 0,
            }}
            >
          </div>}
        </div>


        {!disabled && draggingIndex !== null && (
          <div
            className={styles.dragPreview}
            draggable
            style={{
              position: "fixed",
              top: mousePosition.y + 10 + "px",
              left: mousePosition.x + 10 + "px",
              translate: "-50% -50%",
              pointerEvents: "none",
              opacity: 0.8,
            }}
          >
            {onRender(items[draggingIndex], draggingIndex, true)}
          </div>
        )}
    </>
  );
};

export default DraggableResort;
