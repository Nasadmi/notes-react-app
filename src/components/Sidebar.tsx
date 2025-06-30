import pen from '../assets/pen.png'
import { useNotes } from "../hooks/notes.hook"
import { HugeiconsIcon } from '@hugeicons/react'
import { HomeIcon, ArrowRight01FreeIcons, Archive01FreeIcons, Tag01FreeIcons } from '@hugeicons/core-free-icons'
import { useState } from 'react'
import './styles/Sidebar.css'
import { useFilters } from '../hooks/filter.hook'
import { useViewMode } from '../hooks/viewMode.hook'
import { Icon } from './Icon'

export const Sidebar: React.FC = () => {
    const [typeNote, setTypeNote] = useState<'notes' | 'archived'>('notes')
    const { tags } = useNotes()
    const { toggleTag } = useFilters()
    const { setViewMode } = useViewMode()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const btn = e.target as HTMLButtonElement
        const tag = btn.getAttribute('data-tag')

        if (!tag) {
            return;
        }

        toggleTag(tag)
        btn.classList.toggle('selected')
    }

    return (
        <aside className='sidebar'>
            <div className='sidebar-title'>
                <img src={pen} alt="Logo Image" />
                <h1 className='pacifico'>Notes</h1>
            </div>
            <div className='sidebar-btn-container'>
                <button className={`sidebar-btn-noteToView ${typeNote === 'notes' ? 'selected' : ''}`} onClick={() => {
                    setTypeNote('notes')
                    setViewMode('all')
                }}>
                    <div>
                        <Icon icon={HomeIcon}/>
                        <h3 className='inter'>All Notes</h3>
                    </div>
                    <span className='sidebar-btn-arrow-container'>
                        <Icon icon={ArrowRight01FreeIcons}/>
                    </span>
                </button>

                <button className={`sidebar-btn-noteToView ${typeNote === 'archived' ? 'selected' : ''}`} onClick={() => {
                    setTypeNote('archived')
                    setViewMode('archived')
                }}>
                    <div>
                        <Icon icon={Archive01FreeIcons}/>
                        <h3 className='inter'>Archived</h3>
                    </div>
                    <span className='sidebar-btn-arrow-container'>
                        <Icon icon={ArrowRight01FreeIcons}/>
                    </span>
                </button>
            </div>
            <hr className='sidebar-separator'/>
            <div className='sidebar-tags-list-container'>
                <h4 className='inter'>Tags</h4>
                <ul className='sidebar-tags-list'>
                    {
                        tags.map(tag => (
                            <li>
                                <button className='inter' onClick={handleClick} data-tag={tag}>
                                    <HugeiconsIcon icon={Tag01FreeIcons} size={19} color='var(--text)'  strokeWidth={1.5}/>
                                    {tag}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}