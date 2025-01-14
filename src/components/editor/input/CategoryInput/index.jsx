"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./style.module.css";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";

const MAX = 5

const TextArea = ({ onChange = () => {}, onEnter = () => {}, focus=false, required=false, defaultCategories=["Kategori"], description="Dette er et ubestemt tekstfelt", placeholder="Ubestemt felt" }) => {
  const textareaRef = useRef(null);
  const [tags, setTags] = useState(defaultCategories.map((v) => v.name))

  // Adjust the height of the textarea dynamically
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "2em"; // Reset height to calculate scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    adjustHeight(); // Adjust height when the component is mounted or value changes
  }, [tags, defaultCategories]);

  const AddItem = (tag) => {
    if (tags.map((v) => CreateID(v)).includes(CreateID(tag))) {
      return
    }
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
  const UpdateLine = (index, name) => {
    let _ = [...tags]
    const l = name
    _[index] = l
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
            <div className={styles.tags}>
            {tags.map((t,i) =>
                <TagItem onUpdateLine={UpdateLine} onClick={() => {RemoveItem(i)}} key={CreateID(t)} index={i} title={t} id={CreateID(t)} />
              )}
            </div>
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
}

function TagItem ({id, title, index, onClick, onUpdateLine}) {

  const [isMade, setIsMade] = useState(0)

  useEffect(() => {
    async function fetchCategory () {
      let res
      try {
        res = await fetch(`/api/v1/categories/${id}`)
        const data = await res.json()
        if (data) {
          setIsMade(1)
          onUpdateLine(index, data.name)
        } else {
          setIsMade(2)
        }
      } catch (err) {
        console.error("Error fetching category: " + err)
      }
    }
    fetchCategory()
      
  }, [isMade])

  return <>

    <div onClick={onClick} key={id} className={styles.tag}>
        {isMade !== 0 && <p>{title}</p>}
        {isMade === 2 && <p className={styles.newTag}>Ny</p>}
    </div>
  </>
}


export default TextArea;
