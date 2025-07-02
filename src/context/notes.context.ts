import { createContext } from "react";

import { type Note } from "../service/db";

export interface NotesContextProps {
    notes: Note[];
    tags: string[];
    addNote: (note: Omit<Note, 'id' | 'last_edited' | 'archived'>) => Promise<void>;
    updateNote: (note: Note) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    refreshNotes: () => Promise<void>
}

export const NotesContext = createContext<NotesContextProps | undefined>(undefined)