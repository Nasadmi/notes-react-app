import { useNotesId } from "../hooks/notesId.hook"
import { useNotes } from "../hooks/notes.hook"
import { useEffect, useState } from "react"
import { Icon } from "./Icon"
import type { Note } from "../service/db"
import './styles/NotesContent.css'
import { Clock01FreeIcons, Tag01FreeIcons } from "@hugeicons/core-free-icons"
import { capitalize, formatDate } from "../service/formatDate"

export const NotesContent = () => {
    const { id } = useNotesId()
    const { getNote, updateNote } = useNotes()
    const [note, setNote] = useState<Note | null>(null)
    const [content, setContent] = useState<string>('')

    useEffect(() => {
        (async () => {
            if (!id) {
                return;
            }

            const gettedNote = await getNote(id)
            setNote(gettedNote)
            setContent(gettedNote.content)
        })()
    }, [id, getNote])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textArea = e.target as HTMLTextAreaElement
        setContent(textArea.value)
    }

    const handleClick = () => {
        if (!id) {
            return
        }

        if (!note) {
            return;
        }

        updateNote({ id: id, ...note, content })
    }

    return (
        <div className="notesContent">
            {
                note === null ?
                    ''
                    :
                    (
                        <>
                            <h1 className="inter">{note.title}</h1>
                            <div className="basic-container inter">
                                <ul>
                                    <li className="basic-container-title">
                                        <Icon icon={Tag01FreeIcons}/>
                                        Tags
                                    </li>
                                    <li className="basic-container-title">
                                        <Icon icon={Clock01FreeIcons}/>
                                        Last edited
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        {
                                            note.tags.map((tag, i) => `${capitalize(tag)}${i !== note.tags.length - 1 ? ', ' : ''}`)
                                        }
                                    </li>
                                    <li>
                                        {formatDate(note.last_edited)}
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <textarea className="content inter" placeholder={note.content === '' ? 'Press here to update the note content' : ''} value={content} onChange={handleChange} />
                            <button className={`inter ${note.content !== content && 'active'}`} onClick={note.content !== content ? handleClick : () => {}}>Save Note</button>
                        </>
                    )
            }
        </div>
    )
}