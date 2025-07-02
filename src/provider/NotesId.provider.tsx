import { useState } from "react";
import { NotesId } from "../context/notesId.context";

export const NotesIdProvider = ({ children }: { children: React.ReactNode }) => {
    const [id, setId] = useState<number | null>(null)

    return (
        <NotesId.Provider value={{ id, setId }}>
            { children }
        </NotesId.Provider>
    )
}