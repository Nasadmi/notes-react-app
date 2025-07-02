import { createContext } from "react";

interface NotesIdProps {
    id: number | null;
    setId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const NotesId = createContext<NotesIdProps | undefined>(undefined)