import { createContext } from "react";

export type ViewMode = 'all' |  'archived'

interface ViewModeContextProps {
    viewMode: ViewMode
    setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
}

export const ViewModeContext = createContext<ViewModeContextProps | undefined>(undefined)