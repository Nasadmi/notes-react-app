import { useContext } from "react";
import { FilterContext } from "../context/filter.context";

export const useFilters = () => {
    const ctx = useContext(FilterContext)
    if (!ctx) {
        throw new Error('This component is not under de provider')
    }
    return ctx
}