import { useNotesId } from "../hooks/notesId.hook";
import { useNotes } from "../hooks/notes.hook";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import type { Note } from "../service/db";
import "./styles/NotesContent.css";
import { Clock01FreeIcons, Tag01FreeIcons } from "@hugeicons/core-free-icons";
import { capitalize, formatDate } from "../service/formatDate";
import { Alert } from "../service/alerts";

export const NotesContent = () => {
  const { id } = useNotesId();
  const { getNote, updateNote } = useNotes();
  const [note, setNote] = useState<Note | null>(null);
  const [content, setContent] = useState<string>("");
  const isFirstLoad = useRef(true)

  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }

      if (!isFirstLoad.current && note && note.content !== content) {
        Alert.fire({
          title: "Content dont updated",
          text: "The note content hasn't been saved",
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "Save changes",
          showCancelButton: true,
          cancelButtonText: "Cancel changes",
        }).then((result) => {
          if (!result.isConfirmed) {
            return;
          }

          if (!note) return;

          (async () => {
            await updateNote({ id: id, ...note, content });
          })();
        });
      }

      const gettedNote = await getNote(id);
      
      if (!gettedNote) {
        setNote(null)
        return;
      }

      isFirstLoad.current = false;
      setNote(gettedNote);
      setContent(gettedNote.content);
    })();
  }, [id, getNote]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textArea = e.target as HTMLTextAreaElement;
    setContent(textArea.value);
  };

  const handleClick = () => {
    if (!id) {
      return;
    }

    if (!note) {
      return;
    }

    isFirstLoad.current = true
    updateNote({ id: id, ...note, content });
  };

  return (
    <div className="notesContent">
      {note === null ? (
        ""
      ) : (
        <>
          <h1 className="inter">{note.title}</h1>
          <div className="basic-container inter">
            <ul>
              <li className="basic-container-title">
                <Icon icon={Tag01FreeIcons} />
                Tags
              </li>
              <li className="basic-container-title">
                <Icon icon={Clock01FreeIcons} />
                Last edited
              </li>
            </ul>
            <ul>
              <li>
                {note.tags.map(
                  (tag, i) =>
                    `${capitalize(tag)}${
                      i !== note.tags.length - 1 ? ", " : ""
                    }`
                )}
              </li>
              <li>{formatDate(note.last_edited)}</li>
            </ul>
          </div>
          <hr />
          <textarea
            className="content inter"
            placeholder={
              note.content === "" ? "Press here to update the note content" : ""
            }
            value={content}
            onChange={handleChange}
          />
          <button
            className={`inter ${note.content !== content && "active"}`}
            onClick={note.content !== content ? handleClick : () => {}}
          >
            Save Note
          </button>
        </>
      )}
    </div>
  );
};
