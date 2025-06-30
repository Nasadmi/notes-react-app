import { useState, type ReactNode } from "react";

import { ViewModeContext, type ViewMode } from "../context/viewMode.context";

export const ViewModeProvider = ({children}: { children: ReactNode }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('all')

    return (
        <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
            {children}
        </ViewModeContext.Provider>
    )
}