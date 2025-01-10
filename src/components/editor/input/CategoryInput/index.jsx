"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./style.module.css";

const MAX = 5

const TextArea = ({ onChange = () => {}, onEnter = () => {}, focus=false, required=false, defaultValues=["Kategori"], description="Dette er et ubestemt tekstfelt", placeholder="Ubestemt felt" }) => {
  const textareaRef = useRef(null);
  const [tags, setTags] = useState(defaultValues)

  // Adjust the height of the textarea dynamically
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "2em"; // Reset height to calculate scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    adjustHeight(); // Adjust height when the component is mounted or value changes
  }, [tags, defaultValues]);

  const AddItem = (tag) => {
    setTags([...tags, tag])
  }
  const TagsLeft = () => {
    return MAX - tags.length
  }
  const RemoveItem = (index) => {
    let _ = [...tags]
    const x = _.splice(index, 1);
    setTags(_)
  }
  const CreateID = (name) => {
    let sanitized = name.replace(/[^a-zA-Z0-9 ]/g, "");
    let transformed = sanitized.replace(/ /g, "_");
    return transformed
  }

  useEffect(() => {
    onChange(tags)
  }, [tags])

  return (
    <div>
        {description && <p className={styles.description}>{description}</p> }
        <div className={styles.field}>
            {tags.map((t,i) =>
                <p key={t+i} onClick={() => {RemoveItem(i)}} className={styles.tag}>{CreateID(t)}</p>
            )}
            <textarea
            maxLength={24}
              ref={textareaRef}
              disabled={TagsLeft() < 1}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  AddItem(e.target.value)
                  onEnter(e.target.value);
                  e.target.value = ""
                }
              }}
              onChange={(e) => {adjustHeight();}}
              />
              <div className={styles.max}>{TagsLeft()}</div>
        </div>
    </div>
  );
};

export default TextArea;
