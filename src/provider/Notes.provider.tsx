import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Note } from "../service/db";
import { indexedDBService } from "../service/db";
import { type NotesContextProps, NotesContext } from "../context/notes.context";

export const NotesProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  
  const tags = useMemo(() => {
    const tagSet = new Set<string>()
    notes.forEach(note => {
        note.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort((a,b) => a.localeCompare(b))
  }, [notes])

  const refreshNotes = async () => {
    const all = await indexedDBService.getAllNotes();
    setNotes(all);
  };

  useEffect(() => {
    refreshNotes();
  }, []);

  const addNote: NotesContextProps["addNote"] = async (note) => {
    const newNote: Omit<Note, "id"> = {
      ...note,
      last_edited: Date.now(),
      archived: false,
    };
    await indexedDBService.addNote(newNote);
    await refreshNotes()
  };

  const updateNote: NotesContextProps["updateNote"] = async (note: Note) => {
    const noteUpdated: Note = { ...note, last_edited: Date.now() };
    await indexedDBService.updateNote(noteUpdated);
    await refreshNotes()
  };

  const deleteNote: NotesContextProps["deleteNote"] = async (id) => {
    await indexedDBService.removeNote(id);
    await refreshNotes()
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, refreshNotes, tags }}
    >
      {children}
    </NotesContext.Provider>
  );
};
