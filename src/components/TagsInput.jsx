import React, { useState } from "react";
import styles from "../styles/TagsInput.module.css"

function TagsInput() {
  const [tags, setTags] = useState(["sverige"]);
  const removeTags = indexToRemove => {
      setTags(tags.filter((_, index) => index !== indexToRemove)); 
  }
  const addTags = () => {
   if (event.target.value != "") {
    setTags([...tags, event.target.value]);
    event.target.value = ""
   }
  };

  return (
    <div>
      <div className="tags-input">
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              <i className = "material-icons" onClick= {() => removeTags(index)}>close</i>
              <span>{tag.toUpperCase()}</span>
              
            </li>
          ))}

          
        </ul>
        <input type="text" placeholder="tags" onKeyUp={e => (e.key == "Enter" ? addTags(e) : null)} />
      </div>
    </div>
  );
}

export default TagsInput;
