import { useEffect, useRef, useState } from "react";
import { useNotes } from "../hooks/notes.hook";
import { Icon } from "./Icon";
import { Tag01FreeIcons, Add01FreeIcons } from "@hugeicons/core-free-icons";
import "./styles/AddNotes.css";
import { AddTag } from "./AddTag";
import { capitalize } from "../service/formatDate";
import { ErrorAlert, Toast } from "../service/alerts";

export const AddNote = ({ showing }: { showing: boolean }) => {
  const { tags, addNote } = useNotes();
  const [settedTags, newSettedTags] = useState<
    Array<string | FormDataEntryValue>
  >([]);
  const [addNewTag, showAddNewTag] = useState<boolean>(false);
  const [newTags, setNewTags] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    newSettedTags(tags);
  }, [tags]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        showAddNewTag(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addNewTag]);

  const handleAddTag = (tag: FormDataEntryValue) => {
    if (tag === "") {
      Toast.fire({
        title: 'The name tag cannot be empty',
        icon: 'warning'
      })
      return;
    }
    
    if (settedTags.includes(tag)) {
      Toast.fire({
        title: 'This tag already exists',
        icon: 'error'
      })
      return;
    }

    newSettedTags((prev) => [...prev, tag]);
    showAddNewTag(false);
  };

  const handleShowAddTag = () => {
    showAddNewTag(!addNewTag);
  };

  const handleSetTags = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const li = e.currentTarget as HTMLLIElement;
    const tag = li.getAttribute("data-tag");

    if (!tag) {
      return;
    }

    setNewTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    li.classList.toggle("selected");
  };

  const handleAddNote = async () => {
    const title = titleRef.current

    const escEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      bubbles: true,
      cancelable: true
    })

    if (title === null) {
      Toast.fire(ErrorAlert)
      return;
    }

    if (title.value === '') {
      Toast.fire({
        title: 'The title cannot be empty',
        icon: 'warning'
      })
      return;
    }

    if (newTags.length === 0) {
      Toast.fire({
        title: 'You must select atleast one tag',
        icon: 'warning'
      })
      return
    }

    await addNote({
      title: title.value,
      tags: newTags,
      content: ''
    })

    document.dispatchEvent(escEvent)
    Toast.fire({
      title: 'Note created successfully',
      icon: 'success'
    })
  }

  return (
    <>
      <div className={`addnotes ${showing && "shows"} inter`}>
        <h2 className="addnotes-title pacifico">Create new Note</h2>
        <h3 className="addnotes-field-title">Title</h3>
        <input type="text" className="addnotes-field-title-input" ref={titleRef}/>
        <h3 className="addnotes-field-title">Tags</h3>
        <ul>
          {settedTags.map((tag, i) => (
            <li key={i} data-tag={tag} onClick={handleSetTags}>
              <Icon icon={Tag01FreeIcons} />
              {capitalize(tag as string)}
            </li>
          ))}
          <li className={`addnotes-add-tag ${addNewTag && "cancel"}`}>
            <button onClick={handleShowAddTag}>
              <Icon icon={Add01FreeIcons} />
            </button>
          </li>
        </ul>
        <button className="addnote-btn inter" onClick={handleAddNote}>
          <Icon icon={Add01FreeIcons} />
          Add note
        </button>
      </div>
      <AddTag handleAddTag={handleAddTag} shows={addNewTag} />
    </>
  );
};
