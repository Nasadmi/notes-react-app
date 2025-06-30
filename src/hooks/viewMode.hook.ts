import { useContext } from "react";
import { ViewModeContext } from "../context/viewMode.context";

export function useViewMode() {
    const ctx = useContext(ViewModeContext)
    if (!ctx) {
        throw new Error('This component is not under the NotesProvider')
    }
    return ctx;
}