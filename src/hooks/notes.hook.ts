import { useContext } from "react";
import { NotesContext } from "../context/notes.context";

export function useNotes() {
    const ctx = useContext(NotesContext)
    if (!ctx) {
        throw new Error('This component is not under the NotesProvider')
    }
    return ctx;
}