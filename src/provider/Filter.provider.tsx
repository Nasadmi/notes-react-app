import { useMemo, useState, type ReactNode } from "react"
import { FilterContext } from "../context/filter.context"
import { useNotes } from "../hooks/notes.hook"

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const { notes } = useNotes()
    const [search, setSearch] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
    }

    const clearFilters = () => {
        setSearch('')
        setSelectedTags([])
    }

    const filteredNotes = useMemo(() => {
        const searchLower = search.toLowerCase()
        return notes.filter(note => {
            const matchesSearch = searchLower.length !== 0 ?
                (
                    note.title.toLowerCase().includes(searchLower) ||
                    note.content.toLowerCase().includes(searchLower) ||
                    note.tags.some(tag => tag.toLowerCase().includes(searchLower))
                ) :
                true
                
            
            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every(tag => note.tags.includes(tag))
            
            return matchesSearch && matchesTags
        });
    }, [notes, search, selectedTags])

    return (
        <FilterContext.Provider value={{ setSearch, selectedTags, notes, filteredNotes, clearFilters, search, toggleTag }}>
            {children}
        </FilterContext.Provider>
    )
}