import classNames from "classnames";
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";
import Margin from "@/components/common/Margin";

const DraggableResort = ({ onChange, disabled,  items, onRender, forceDraggable=false }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [draggingOverIndex, setDraggingOverIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [draggingTweenIndex, setDraggingTweenIndex] = useState(null)

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

    setDraggingTweenIndex(null)
    setDraggingOverIndex(index)
  };

  const handleDragOverTween = (e, index) => {
    e.preventDefault();
    if (disabled) {return;}

    setDraggingTweenIndex(index)
    setDraggingOverIndex(null)
  }

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

  const handleDropSpace = (e, index) => {
    if (disabled) { return }
    
    console.log(index, draggingIndex)
    console.log(`Moving from ${draggingIndex} to ${index}`)

    if (index == draggingIndex) { console.log("Its already here"); return; }

    let newOrder = items.filter((_, i) => i !== draggingIndex); // Remove the dragged item
    newOrder.splice(index, 0, items[draggingIndex]); // Insert at new position
    
    onChange(newOrder)
    console.table(newOrder)
  }

  const handleDragEnd = (e, index) => {
    if (disabled) {return;}
    setDraggingIndex(null);
    setDraggingOverIndex(null)
    setDraggingTweenIndex(null)
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
        <div className={classNames(styles.c, draggingIndex !== null ? styles.isDragging : null)}>
          {items.map((item, index) => (
            <div key={index} className={styles.holder}>
                {index == 0 && <div
                    onDrop={(e) => handleDropSpace(e, index)}
                    onDragOver={(e) => handleDragOverTween(e, 0)}
                    className={classNames(styles.tween, styles.bottom, 
                      draggingTweenIndex == index ? styles.visible : styles.hidden,
                      draggingIndex !== null ? styles.isDragging : styles.notDragging
                  )}></div>
                }
                <div
                className={classNames(
                  styles.item,
                  !disabled && draggingIndex == index ? styles.dragging : "",
                  !disabled && draggingOverIndex == index ? styles.draggingOver : ""
                )}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={(e) => handleDragEnd(e, index)}
                >
                  {onRender(item, index, draggingIndex === index)}
                </div>
                <div
                    onDrop={(e) => handleDropSpace(e, index + 1)}
                    onDragOver={(e) => handleDragOverTween(e, index + 1)}
                    className={classNames(styles.tween, styles.bottom, 
                        draggingTweenIndex == index + 1 ? styles.visible : styles.hidden,
                        draggingIndex !== null ? styles.isDragging : styles.notDragging
                    )}></div>
            </div>
          ))}

          {/* Delete Item */}

          {!disabled && <div
            onDrop={handleDelete}
            onDragOver={(e) => handleDragOver(e, "DELETE")}
            className={classNames(styles.delete,
                draggingOverIndex === "DELETE" ? styles.visible : styles.hidden,
                draggingIndex !== null ? styles.isDragging : styles.notDragging
            )}
            >
              Slett
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
