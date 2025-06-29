import { createContext } from "react";
import type { Note } from "../service/db";

interface FilterContextType {
    notes: Note[]
    filteredNotes: Note[]
    search: string
    setSearch: (v: string) => void
    selectedTags: string[]
    toggleTag: (tag: string) => void
    clearFilters: () => void
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined)