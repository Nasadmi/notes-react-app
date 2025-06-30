import { useRef } from "react"
import { Search01FreeIcons, Settings01FreeIcons } from "@hugeicons/core-free-icons"
import { useFilters } from "../hooks/filter.hook"
import { useViewMode } from "../hooks/viewMode.hook"
import debounce from "debounce"
import './styles/Search.css'
import { Icon } from "./Icon"

export const Search: React.FC = () => {
    const { viewMode } = useViewMode()
    const { setSearch } = useFilters()
    const input = useRef<HTMLInputElement | null>(null)

    const handleWrite = () => {
        input.current?.focus()
    }

    const handleChange = () => {
        setSearch(input.current?.value || '')
    }

    return (
        <header className="search">
            <h1 className="search-title-view-mode inter">{viewMode} Notes</h1>
            <div className="search-utils">
                <div className="search-utils-input-container" onClick={handleWrite}>
                    <Icon icon={Search01FreeIcons}/>
                    <input type="text" placeholder="Search by tite, content, tags..." className="inter" ref={input} onChange={debounce(handleChange, 500)}/>
                </div>
                <button className="layout-settings">
                    <Icon icon={Settings01FreeIcons} />
                </button>
            </div>
        </header>
    )
}