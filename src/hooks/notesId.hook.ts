import { useContext } from "react";
import { NotesId } from "../context/notesId.context";

export const useNotesId = () => {
    const ctx = useContext(NotesId);

    if (!ctx) {
        throw new Error('This component is not under the provider')
    }

    return ctx;
}