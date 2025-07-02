import { useFilters } from "../hooks/filter.hook"
import { AddNote } from "./AddNotes"
import { formatDate, capitalize } from "../service/formatDate"
import { useEffect, useState } from "react"
import { Add01FreeIcons } from "@hugeicons/core-free-icons"
import { Icon } from "./Icon"
import './styles/NotesList.css'

export const NotesList = () => {
    const { filteredNotes } = useFilters()
    const [showAddNotes, setShowAddNotes] = useState<boolean>(false)
    const [selectedNote, setSelectedNote] = useState<number | undefined>(undefined)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowAddNotes(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [showAddNotes])

    const handleSelectNote = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const li = e.currentTarget as HTMLLIElement
        const id = li.getAttribute('data-id')

        if (!id) {
            return;
        }

        setSelectedNote(parseInt(id))
    }

    return (
        <section className="notes-list">
            <button onClick={() => setShowAddNotes(!showAddNotes)} className={`notes-list-showAddNotes inter ${showAddNotes && 'cancel'}`}>
                <Icon icon={Add01FreeIcons} />
                { showAddNotes ? 'Cancel (Escape)' : 'Create a new Note' }
            </button>
            <ul className="notes-list-ul">
                {
                    filteredNotes.map((note) => (
                        <li data-id={note.id} key={note.id} onClick={handleSelectNote} className={note.id === selectedNote ? 'selected' : ''}>
                            <h2 className="inter">{note.title}</h2>
                            <ul>
                                {
                                    note.tags.map((tag, i) => (
                                        <li key={i} className="inter">
                                            { capitalize(tag) }
                                        </li>
                                    ))
                                }
                            </ul>
                            <h3 className="inter">{formatDate(note.last_edited)}</h3>
                        </li>
                    ))
                }
            </ul>
            <AddNote showing={showAddNotes} />
        </section>
    )
}